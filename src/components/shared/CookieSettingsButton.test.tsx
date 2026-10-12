import { cookies as copy } from '@/config/content';
import { OPEN_CONSENT_SETTINGS_EVENT } from '@/lib/consent';

import CookieSettingsButton from './CookieSettingsButton';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('CookieSettingsButton', () => {
  it('reopens the consent settings', () => {
    const listener = vi.fn();
    window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, listener);
    render(<CookieSettingsButton />);

    fireEvent.click(screen.getByRole('button', { name: copy.settingsTrigger }));

    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, listener);
  });
});
