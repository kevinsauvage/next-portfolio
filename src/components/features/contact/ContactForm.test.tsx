import ContactForm from './ContactForm';

/* eslint-disable sonarjs/max-lines-per-function */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

const mocks = vi.hoisted(() => ({
  executeRecaptcha: vi.fn(),
  sendMailAction: vi.fn(),
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
}));

const recaptcha = vi.hoisted(() => ({
  current: undefined as ((action?: string) => Promise<string>) | undefined,
}));

vi.mock('react-google-recaptcha-v3', () => ({
  useGoogleReCaptcha: () => ({ executeRecaptcha: recaptcha.current }),
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

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    recaptcha.current = mocks.executeRecaptcha;
    mocks.executeRecaptcha.mockResolvedValue('captcha-token');
    mocks.sendMailAction.mockResolvedValue({
      fieldErrors: {},
      message: 'Your message has been sent successfully.',
      status: 'success',
    });
  });

  it('renders labeled fields without accessibility violations', async () => {
    const { container } = render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();

    expect(await axe(container)).toHaveNoViolations();
  });

  it('shows an error when reCAPTCHA is unavailable', async () => {
    recaptcha.current = undefined;
    render(<ContactForm />);
    fillForm(validValues);

    submitForm();

    await waitFor(() => {
      expect(mocks.toastError).toHaveBeenCalledWith(
        expect.stringMatching(/reCAPTCHA is not available/i)
      );
    });
    expect(mocks.sendMailAction).not.toHaveBeenCalled();
  });

  it('blocks submit and surfaces inline errors when client validation fails', async () => {
    render(<ContactForm />);

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
    render(<ContactForm />);
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
    render(<ContactForm />);
    fillForm(validValues);

    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
    expect(mocks.toastError).toHaveBeenCalledWith('Validation failed');
  });
});
