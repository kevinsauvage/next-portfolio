import ConsentModeDefaults from './ConsentModeDefaults';

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/csp-nonce', () => ({ getNonce: async () => 'test-nonce' }));

const renderSnippet = async () => {
  const { container } = render(await ConsentModeDefaults());
  return container.querySelector('script');
};

describe('ConsentModeDefaults', () => {
  it('renders an inline script carrying the request nonce', async () => {
    const script = await renderSnippet();

    expect(script?.getAttribute('nonce')).toBe('test-nonce');
  });

  it('defaults every optional category to denied before any tag can fire', async () => {
    const script = await renderSnippet();
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
