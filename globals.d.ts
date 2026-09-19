import type { UmamiTracker } from './src/lib/analytics';

declare module '*.scss';

interface Window {
  umami?: UmamiTracker;
}
