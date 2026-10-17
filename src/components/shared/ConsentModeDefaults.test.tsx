import ConsentModeDefaults from './ConsentModeDefaults';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const renderSnippet = () => {
  const { container } = render(ConsentModeDefaults());
  return container.querySelector('script');
};

describe('ConsentModeDefaults', () => {
  it('renders an inline consent-default script', () => {
    const script = renderSnippet();

    expect(script).not.toBeNull();
    expect(script?.textContent).toContain("gtag('consent','default'");
  });

  it('defaults every optional category to denied before any tag can fire', () => {
    const script = renderSnippet();
    const dataLayer: unknown[][] = [];
    const sandbox = { dataLayer } as unknown as Window;

    new Function('window', script?.textContent ?? '')(sandbox);

    expect(dataLayer).toHaveLength(1);
    const [command, action, consent] = Array.from(dataLayer[0] ?? []);
    expect(command).toBe('consent');
    expect(action).toBe('default');
    expect(consent).toEqual({
      ad_personalization: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      wait_for_update: 500,
    });
  });
});
