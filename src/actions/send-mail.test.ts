/* eslint-disable sonarjs/max-lines-per-function, sonarjs/no-duplicate-string */
import { resetRateLimit } from '@/lib/rate-limit';

import { type ContactFormState, sendMailAction } from './send-mail';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getServerEnvMock, emailjsSendMock, logErrorMock, headersMock } = vi.hoisted(() => ({
  getServerEnvMock: vi.fn(),
  emailjsSendMock: vi.fn(),
  logErrorMock: vi.fn(),
  headersMock: vi.fn(),
}));

vi.mock('@/lib/env', () => ({ getServerEnv: getServerEnvMock }));
vi.mock('@/lib/error-tracking', () => ({ logError: logErrorMock }));
vi.mock('@emailjs/nodejs', () => ({ default: { send: emailjsSendMock } }));
vi.mock('next/headers', () => ({ headers: headersMock }));

const fetchMock = vi.fn();

const validPayload = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Hello there, this is a message.',
  captcha: 'captcha-token',
};

const idle: ContactFormState = { status: 'idle', fieldErrors: {} };

const captchaResponse = (body: Record<string, unknown>, ok = true) => ({
  ok,
  json: async () => ({ action: 'contactMessage', ...body }),
});

const buildFormData = (values: Record<string, string>) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) formData.set(key, value);
  return formData;
};

const submit = (values: Record<string, string> = validPayload) =>
  sendMailAction(idle, buildFormData(values));

beforeEach(() => {
  vi.clearAllMocks();
  resetRateLimit();
  vi.stubGlobal('fetch', fetchMock);
  headersMock.mockResolvedValue(new Headers({ 'x-forwarded-for': '203.0.113.7' }));
  getServerEnvMock.mockReturnValue({
    email_js_service_id: 'service-id',
    email_js_public_key: 'public-key',
    email_js_private_key: 'private-key',
    email_js_template_id: 'template-id',
    RECAPTCHA_SECRET_KEY: 'recaptcha-secret',
  });
  emailjsSendMock.mockResolvedValue({ status: 200, text: 'OK' });
  fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.9 }));
});

describe('sendMailAction: validation and captcha', () => {
  it('returns field errors when the payload is invalid', async () => {
    const state = await submit({ fullName: '', email: 'not-an-email', message: '', captcha: '' });

    expect(state.status).toBe('error');
    expect(state.message).toBe('Validation failed');
    expect(state.fieldErrors).toMatchObject({
      fullName: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
      captcha: expect.any(String),
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('rejects payloads exceeding the field length caps', async () => {
    const state = await submit({ ...validPayload, message: 'x'.repeat(5001) });

    expect(state.message).toBe('Validation failed');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ['score below the threshold', { success: true, score: 0.3 }],
    ['unsuccessful response', { success: false, score: 0.9 }],
    ['missing score', { success: true }],
    ['mismatched action', { success: true, score: 0.9, action: 'login' }],
  ])('rejects a captcha with a %s', async (_label, body) => {
    fetchMock.mockResolvedValue(captchaResponse(body));

    const state = await submit();

    expect(state.status).toBe('error');
    expect(state.message).toBe('Captcha validation failed');
    expect(state.fieldErrors.captcha).toBeTruthy();
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('rejects a captcha verified for a different hostname', async () => {
    headersMock.mockResolvedValue(
      new Headers({ host: 'www.kevin-sauvage.com:443', 'x-forwarded-for': '203.0.113.7' })
    );
    fetchMock.mockResolvedValue(
      captchaResponse({ success: true, score: 0.9, hostname: 'evil.example' })
    );

    const state = await submit();

    expect(state.fieldErrors.captcha).toBeTruthy();
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('accepts a captcha verified for the request hostname', async () => {
    headersMock.mockResolvedValue(
      new Headers({ host: 'www.kevin-sauvage.com', 'x-forwarded-for': '203.0.113.7' })
    );
    fetchMock.mockResolvedValue(
      captchaResponse({ success: true, score: 0.9, hostname: 'www.kevin-sauvage.com' })
    );

    expect((await submit()).status).toBe('success');
  });

  it('fails closed when the response omits a hostname but the request host is known', async () => {
    headersMock.mockResolvedValue(new Headers({ host: 'www.kevin-sauvage.com' }));
    fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.9 }));

    const state = await submit();

    expect(state.fieldErrors.captcha).toBeTruthy();
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('rejects when Google answers with an HTTP error', async () => {
    fetchMock.mockResolvedValue(captchaResponse({}, false));

    expect((await submit()).fieldErrors.captcha).toBeTruthy();
  });

  it('gives the verification call a timeout signal', async () => {
    await submit();

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('fails with a generic error (not a hang) when verification times out', async () => {
    fetchMock.mockRejectedValue(new DOMException('timeout', 'TimeoutError'));

    const state = await submit();

    expect(state.status).toBe('error');
    expect(state.message).toBe('Failed to send email');
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });
});

describe('sendMailAction: delivery', () => {
  it('sends the email and returns a success state', async () => {
    const state = await submit();

    expect(state.status).toBe('success');
    expect(state.fieldErrors).toEqual({});
    expect(state.message).toContain('sent successfully');
    expect(emailjsSendMock).toHaveBeenCalledWith(
      'service-id',
      'template-id',
      {
        email: validPayload.email,
        fullName: validPayload.fullName,
        message: validPayload.message,
      },
      { privateKey: 'private-key', publicKey: 'public-key' }
    );
  });

  it('returns a generic error when the email provider fails', async () => {
    emailjsSendMock.mockRejectedValue(new Error('provider down'));

    const state = await submit();

    expect(state.status).toBe('error');
    expect(state.message).toBe('Failed to send email');
    expect(logErrorMock).toHaveBeenCalledTimes(1);
    expect(logErrorMock).toHaveBeenCalledWith(expect.any(Error), 'contact_provider_failed');
  });
});

describe('sendMailAction: rate limits', () => {
  it('blocks submissions after the per-IP rate limit is exceeded', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const state = await submit({ ...validPayload, email: `user${attempt}@example.com` });
      expect(state.status).toBe('success');
    }

    const blocked = await submit({ ...validPayload, email: 'user-blocked@example.com' });

    expect(blocked.status).toBe('error');
    expect(blocked.message).toMatch(/too many messages/i);
    expect(emailjsSendMock).toHaveBeenCalledTimes(5);
  });

  it('prefers x-real-ip over x-forwarded-for', async () => {
    headersMock.mockResolvedValue(
      new Headers({ 'x-forwarded-for': '10.0.0.1, 10.0.0.2', 'x-real-ip': '203.0.113.50' })
    );
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await submit({ ...validPayload, email: `user${attempt}@example.com` });
    }

    // Same forwarded chain, different real IP: a separate bucket, so still allowed.
    headersMock.mockResolvedValue(
      new Headers({ 'x-forwarded-for': '10.0.0.1, 10.0.0.2', 'x-real-ip': '203.0.113.51' })
    );
    expect((await submit({ ...validPayload, email: 'other@example.com' })).status).toBe('success');
  });

  it('throttles a single address across different client IPs', async () => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      headersMock.mockResolvedValue(new Headers({ 'x-forwarded-for': `198.51.100.${attempt}` }));
      expect((await submit()).status).toBe('success');
    }

    headersMock.mockResolvedValue(new Headers({ 'x-forwarded-for': '198.51.100.99' }));
    const blocked = await submit();

    expect(blocked.status).toBe('error');
    expect(blocked.message).toMatch(/too many messages sent from this address/i);
    expect(emailjsSendMock).toHaveBeenCalledTimes(3);
  });

  it('does not use up an address allowance when the captcha fails', async () => {
    fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.1 }));
    for (let attempt = 0; attempt < 4; attempt += 1) {
      headersMock.mockResolvedValue(new Headers({ 'x-forwarded-for': `198.51.100.${attempt}` }));
      await submit();
    }

    fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.9 }));
    headersMock.mockResolvedValue(new Headers({ 'x-forwarded-for': '198.51.100.200' }));

    expect((await submit()).status).toBe('success');
  });

  it('fails closed in production when no client IP can be derived', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    headersMock.mockResolvedValue(new Headers());

    try {
      const state = await submit();

      expect(state.status).toBe('error');
      expect(state.message).toMatch(/could not verify/i);
      expect(emailjsSendMock).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllEnvs();
    }
  });
});
