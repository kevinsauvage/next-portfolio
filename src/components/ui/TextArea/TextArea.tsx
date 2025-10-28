type Properties = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ ...rest }: Properties) => (
  <textarea
    className='min-h-40 w-full resize-y rounded-lg border border-zinc-600/80 bg-zinc-900/70 px-4 py-3 text-base text-zinc-100 placeholder-zinc-400 shadow-[0_0_0_1px_rgba(15,23,42,0.25)] transition-all hover:border-zinc-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-zinc-950 aria-[invalid=true]:border-rose-400 aria-[invalid=true]:bg-rose-950/20 aria-[invalid=true]:text-rose-100 aria-[invalid=true]:placeholder-rose-300/70 aria-[invalid=true]:shadow-[0_0_0_1px_rgba(244,63,94,0.35)] aria-[invalid=true]:focus:border-rose-400 aria-[invalid=true]:focus:ring-rose-400 aria-[invalid=true]:focus:ring-offset-rose-200/10'
    {...rest}
  />
);

export default TextArea;
