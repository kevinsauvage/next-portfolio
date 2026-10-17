/**
 * Toast helpers that load `sonner` on demand.
 *
 * Components rendered on first paint (the contact form, the copy button) must
 * not import `sonner` directly: that pulls the library into every page's initial
 * bundle. Nothing a toast reports can happen before the visitor acts, so loading
 * the library at that moment costs nothing in practice.
 */

/**
 * Mounts the toaster. Dispatched before sonner is imported so the toaster is in
 * place, and because sonner replays toasts that predate its subscription it is
 * safe even if the mount lands a tick later.
 */
export const TOAST_REQUESTED_EVENT = 'sonner:toast-requested';

const loadToast = () => import('sonner').then(module => module.toast);

export const notifyError = (message: string): void => {
  window.dispatchEvent(new Event(TOAST_REQUESTED_EVENT));
  void loadToast().then(toast => toast.error(message));
};

export const notifySuccess = (message: string): void => {
  window.dispatchEvent(new Event(TOAST_REQUESTED_EVENT));
  void loadToast().then(toast => toast.success(message));
};
