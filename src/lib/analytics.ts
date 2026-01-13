declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function isUmamiAvailable(): boolean {
  return (
    typeof globalThis.window !== 'undefined' && typeof globalThis.window.umami?.track === 'function'
  );
}

export function trackEvent(eventName: string, data?: Record<string, unknown>): void {
  if (isUmamiAvailable()) {
    globalThis.window.umami?.track(eventName, data);
  }
}

export function getUmamiScriptProps(
  umamiId: string | undefined
): { 'data-website-id': string; src: string } | null {
  if (!umamiId) return null;
  return { 'data-website-id': umamiId, src: '/growth/rewrites' };
}
