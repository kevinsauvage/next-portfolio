import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import ContactForm from './ContactForm';

/* eslint-disable sonarjs/max-lines-per-function */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

const mocks = vi.hoisted(() => ({
  sendMailAction: vi.fn(),
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
}));

vi.mock('@/actions/send-mail', () => ({
  sendMailAction: mocks.sendMailAction,
}));

vi.mock('sonner', () => ({
  toast: { error: mocks.toastError, success: mocks.toastSuccess },
}));

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }));

const validValues = {
  email: 'jane@example.com',
  fullName: 'Jane Doe',
  message: 'Hello there, this is a message.',
};

const fillForm = (values: typeof validValues) => {
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: values.fullName } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: values.email } });
  fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
    target: { value: values.message },
  });
};

const submitForm = () => {
  const form = screen.getByRole('form');
  fireEvent.submit(form);
  return form;
};

const RE_CAPTCHA_KEY = 'test-site-key';

const renderForm = () => render(<ContactForm reCaptchaKey={RE_CAPTCHA_KEY} />);

type GrecaptchaStub = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

/** Mirrors what the provider's script exposes once it has loaded. */
const setGrecaptcha = (captchaToken: string) => {
  (globalThis as { grecaptcha?: GrecaptchaStub }).grecaptcha = {
    ready: callback => callback(),
    execute: () => Promise.resolve(captchaToken),
  };
};

/** Simulates the script not having loaded yet. */
const clearGrecaptcha = () => {
  delete (globalThis as { grecaptcha?: GrecaptchaStub }).grecaptcha;
};

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setGrecaptcha('captcha-token');
    mocks.sendMailAction.mockResolvedValue({
      fieldErrors: {},
      message: 'Your message has been sent successfully.',
      status: 'success',
    });
  });

  it('renders labeled fields without accessibility violations', async () => {
    const { container } = renderForm();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    // RGAA 11.10: the asterisk convention is explained before the fields.
    expect(screen.getByText(/marked with an asterisk \(\*\) are required/i)).toBeInTheDocument();

    expect(await axe(container)).toHaveNoViolations();
  });

  it('shows an error when reCAPTCHA is unavailable', async () => {
    clearGrecaptcha();
    renderForm();
    fillForm(validValues);

    submitForm();

    await waitFor(() => {
      expect(mocks.toastError).toHaveBeenCalledWith(
        expect.stringMatching(/security check is still loading/i)
      );
    });
    expect(mocks.sendMailAction).not.toHaveBeenCalled();
  });

  it('shows an error when the captcha token comes back empty', async () => {
    setGrecaptcha('');
    renderForm();
    fillForm(validValues);

    submitForm();

    await waitFor(() => {
      expect(mocks.toastError).toHaveBeenCalledWith('Failed to get reCAPTCHA token');
    });
    expect(mocks.sendMailAction).not.toHaveBeenCalled();
  });

  it('blocks submit and surfaces inline errors when client validation fails', async () => {
    renderForm();

    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
    });
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
    expect(mocks.sendMailAction).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/full name/i)).toHaveFocus();
  });

  it('submits the form with a captcha token and shows a success panel', async () => {
    renderForm();
    fillForm(validValues);

    submitForm();

    await waitFor(() => {
      expect(mocks.sendMailAction).toHaveBeenCalledTimes(1);
    });

    const submitted = mocks.sendMailAction.mock.calls[0]?.[1] as FormData;
    expect(submitted.get('captcha')).toBe('captcha-token');
    expect(submitted.get('email')).toBe(validValues.email);

    await waitFor(() => {
      expect(mocks.toastSuccess).toHaveBeenCalled();
    });

    expect(await screen.findByText('Message sent')).toBeInTheDocument();
    const sendAnother = screen.getByRole('button', { name: /send another message/i });

    fireEvent.click(sendAnother);
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
  });

  it('renders server-side field errors', async () => {
    mocks.sendMailAction.mockResolvedValue({
      fieldErrors: { email: 'Please enter a valid email address' },
      message: 'Validation failed',
      status: 'error',
    });
    renderForm();
    fillForm(validValues);

    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
    // The toast fires from a passive effect after the error renders, so it
    // must be awaited too — asserting it synchronously races the effect.
    await waitFor(() => {
      expect(mocks.toastError).toHaveBeenCalledWith('Validation failed');
    });
  });

  it('renders a form-level captcha error', async () => {
    mocks.sendMailAction.mockResolvedValue({
      fieldErrors: { captcha: 'Captcha validation failed. Please try again.' },
      message: 'Captcha validation failed',
      status: 'error',
    });
    renderForm();
    fillForm(validValues);

    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Captcha validation failed. Please try again.')).toBeInTheDocument();
    });
    // The toast fires from a passive effect after the error renders, so it
    // must be awaited too — asserting it synchronously races the effect.
    await waitFor(() => {
      expect(mocks.toastError).toHaveBeenCalledWith('Captcha validation failed');
    });
  });

  it('tracks every successful submission, not just the first', async () => {
    // A real server action returns a fresh object per call.
    mocks.sendMailAction.mockImplementation(async () => ({
      fieldErrors: {},
      message: 'Your message has been sent successfully.',
      status: 'success',
    }));
    renderForm();

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      fillForm(validValues);
      submitForm();
      await screen.findByText('Message sent');
      fireEvent.click(screen.getByRole('button', { name: /send another message/i }));
    }

    const successCalls = vi
      .mocked(trackEvent)
      .mock.calls.filter(([name]) => name === ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT_SUCCESS);
    expect(successCalls).toHaveLength(2);
  });
});
