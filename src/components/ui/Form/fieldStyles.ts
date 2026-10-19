/**
 * Shared look of text inputs and textareas, including the invalid state.
 * The border is the only thing that outlines an empty field, so it keeps 3:1
 * against the page (zinc-500 on the field is ~3.8:1; WCAG 1.4.11 / RGAA 3.3).
 */
export const FIELD_CLASSES = [
  'w-full rounded-lg border border-zinc-500 bg-zinc-900/70 px-4 py-3 text-base shadow-[0_0_0_1px_rgba(15,23,42,0.25)] transition-[border-color,box-shadow] duration-150 ease-out hover:border-zinc-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-black',
  'text-zinc-50 placeholder-zinc-400',
  'aria-[invalid=true]:border-rose-400 aria-[invalid=true]:bg-rose-950/20 aria-[invalid=true]:text-rose-100 aria-[invalid=true]:placeholder-rose-300/70 aria-[invalid=true]:shadow-[0_0_0_1px_rgba(244,63,94,0.35)] aria-[invalid=true]:focus:border-rose-400 aria-[invalid=true]:focus:ring-rose-400 aria-[invalid=true]:focus:ring-offset-rose-200/10',
] as const;
