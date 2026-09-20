/* eslint-disable sonarjs/max-lines-per-function, sonarjs/no-duplicate-string */
import { sendMail, sendMailAction } from './send-mail';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getServerEnvMock, emailjsSendMock, logErrorMock } = vi.hoisted(() => ({
  getServerEnvMock: vi.fn(),
  emailjsSendMock: vi.fn(),
  logErrorMock: vi.fn(),
}));

vi.mock('@/lib/env', () => ({ getServerEnv: getServerEnvMock }));
vi.mock('@/lib/error-tracking', () => ({ logError: logErrorMock }));
vi.mock('@emailjs/nodejs', () => ({ default: { send: emailjsSendMock } }));

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

    expect(result).toEqual({ success: false, error: 'Captcha validation failed' });
    expect(emailjsSendMock).not.toHaveBeenCalled();
  });

  it('sends the email when validation and captcha succeed', async () => {
    const result = await sendMail(validPayload);

    expect(result).toEqual({ success: true });
    expect(emailjsSendMock).toHaveBeenCalledWith('service-id', 'template-id', validPayload, {
      privateKey: 'private-key',
      publicKey: 'public-key',
    });
  });

  it('returns a generic error when the email provider fails', async () => {
    emailjsSendMock.mockRejectedValue(new Error('provider down'));

    const result = await sendMail(validPayload);

    expect(result).toEqual({ success: false, error: 'Failed to send email' });
    expect(logErrorMock).toHaveBeenCalledTimes(1);
  });
});

describe('sendMailAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', fetchMock);
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

  it('maps a captcha failure to an error state without field errors', async () => {
    fetchMock.mockResolvedValue(captchaResponse({ success: true, score: 0.1 }));

    const state = await sendMailAction(
      { status: 'idle', fieldErrors: {} },
      buildFormData(validPayload)
    );

    expect(state.status).toBe('error');
    expect(state.message).toBe('Captcha validation failed');
    expect(state.fieldErrors).toEqual({});
  });
});
