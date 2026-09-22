/* eslint-disable sonarjs/max-lines-per-function, sonarjs/no-duplicate-string */
import { resetRateLimit } from '@/lib/rate-limit';

import { sendMail, sendMailAction } from './send-mail';

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

const captchaResponse = (body: Record<string, unknown>) => ({
  json: async () => body,
});

describe('sendMail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', fetchMock);
    headersMock.mockResolvedValue(new Headers({ 'x-forwarded-for': '203.0.113.7' }));
    getServerEnvMock.mockReturnValue({
      email_js_service_id: 'service-id',
      email_js_public_key: 'public-key',
      email_js_private_key: 'private-key',
      email_js_template_id: 'template-id',
      RECAPTCHA_SECRET_KEY: 'recaptcha-secret',
      NODE_ENV: 'test',
    });
    emailjsSendMock.mockResolvedValue({ status: 200, text: 'OK' });
    fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.9 }));
  });

  it('returns field errors when the payload is invalid', async () => {
    const result = await sendMail({
      fullName: '',
      email: 'not-an-email',
      message: '',
      captcha: '',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('Validation failed');
    expect(result.fieldErrors).toMatchObject({
      fullName: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
      captcha: expect.any(String),
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('rejects when the captcha score is below the threshold', async () => {
    fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.3 }));

    const result = await sendMail(validPayload);

    expect(result).toMatchObject({ success: false, error: 'Captcha validation failed' });
    expect(result.fieldErrors?.['captcha']).toBeTruthy();
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('rejects when the captcha response is unsuccessful', async () => {
    fetchMock.mockResolvedValue(captchaResponse({ success: false, score: 0.9 }));

    const result = await sendMail(validPayload);

    expect(result).toMatchObject({ success: false, error: 'Captcha validation failed' });
    expect(result.fieldErrors?.['captcha']).toBeTruthy();
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('rejects when the captcha score is missing', async () => {
    fetchMock.mockResolvedValue(captchaResponse({ success: true }));

    const result = await sendMail(validPayload);

    expect(result).toMatchObject({ success: false, error: 'Captcha validation failed' });
    expect(result.fieldErrors?.['captcha']).toBeTruthy();
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('rejects payloads exceeding the field length caps', async () => {
    const result = await sendMail({
      ...validPayload,
      message: 'x'.repeat(5001),
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('Validation failed');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends the email when validation and captcha succeed', async () => {
    const result = await sendMail(validPayload);

    expect(result).toEqual({ success: true });
    expect(emailjsSendMock).toHaveBeenCalledWith(
      'service-id',
      'template-id',
      {
        email: validPayload.email,
        fullName: validPayload.fullName,
        message: validPayload.message,
      },
      {
        privateKey: 'private-key',
        publicKey: 'public-key',
      }
    );
  });

  it('returns a generic error when the email provider fails', async () => {
    emailjsSendMock.mockRejectedValue(new Error('provider down'));

    const result = await sendMail(validPayload);

    expect(result).toEqual({ success: false, error: 'Failed to send email' });
    expect(logErrorMock).toHaveBeenCalledTimes(1);
    expect(logErrorMock).toHaveBeenCalledWith(expect.any(Error), 'contact_provider_failed');
  });
});

describe('sendMailAction', () => {
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
      NODE_ENV: 'test',
    });
    emailjsSendMock.mockResolvedValue({ status: 200, text: 'OK' });
    fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.9 }));
  });

  const buildFormData = (values: Record<string, string>) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) formData.set(key, value);
    return formData;
  };

  it('maps a successful submission to a success state', async () => {
    const state = await sendMailAction(
      { status: 'idle', fieldErrors: {} },
      buildFormData(validPayload)
    );

    expect(state.status).toBe('success');
    expect(state.fieldErrors).toEqual({});
    expect(state.message).toContain('sent successfully');
  });

  it('maps validation failures to an error state with field errors', async () => {
    const state = await sendMailAction(
      { status: 'idle', fieldErrors: {} },
      buildFormData({ fullName: '', email: '', message: '', captcha: '' })
    );

    expect(state.status).toBe('error');
    expect(state.fieldErrors.fullName).toBeTruthy();
    expect(state.fieldErrors.email).toBeTruthy();
    expect(state.fieldErrors.message).toBeTruthy();
  });

  it('maps a captcha failure to an error state with a form-level captcha error', async () => {
    fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.1 }));

    const state = await sendMailAction(
      { status: 'idle', fieldErrors: {} },
      buildFormData(validPayload)
    );

    expect(state.status).toBe('error');
    expect(state.message).toBe('Captcha validation failed');
    expect(state.fieldErrors.captcha).toBeTruthy();
  });

  it('blocks submissions after the per-IP rate limit is exceeded', async () => {
    const submit = (email: string) =>
      sendMailAction(
        { status: 'idle', fieldErrors: {} },
        buildFormData({ ...validPayload, email })
      );

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const state = await submit(`user${attempt}@example.com`);
      expect(state.status).toBe('success');
    }

    const blocked = await submit('user-blocked@example.com');

    expect(blocked.status).toBe('error');
    expect(blocked.message).toMatch(/too many messages/i);
    expect(emailjsSendMock).toHaveBeenCalledTimes(5);
  });

  it('throttles a single address across different client IPs', async () => {
    const submit = () =>
      sendMailAction({ status: 'idle', fieldErrors: {} }, buildFormData(validPayload));

    for (let attempt = 0; attempt < 3; attempt += 1) {
      headersMock.mockResolvedValueOnce(
        new Headers({ 'x-forwarded-for': `198.51.100.${attempt}` })
      );
      const state = await submit();
      expect(state.status).toBe('success');
    }

    headersMock.mockResolvedValueOnce(new Headers({ 'x-forwarded-for': '198.51.100.99' }));
    const blocked = await submit();

    expect(blocked.status).toBe('error');
    expect(blocked.message).toMatch(/too many messages sent from this address/i);
    expect(emailjsSendMock).toHaveBeenCalledTimes(3);
  });

  it('fails closed in production when no client IP can be derived', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    headersMock.mockResolvedValue(new Headers());

    try {
      const state = await sendMailAction(
        { status: 'idle', fieldErrors: {} },
        buildFormData(validPayload)
      );

      expect(state.status).toBe('error');
      expect(state.message).toMatch(/could not verify/i);
      expect(emailjsSendMock).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllEnvs();
    }
  });
});
