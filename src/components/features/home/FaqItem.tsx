'use client';

import { useState } from 'react';

import clsx from 'clsx';
import { Plus } from 'lucide-react';

type FaqItemProps = {
  id: string;
  index: number;
  question: string;
  answer: string;
};

const FaqItem = ({ id, index, question, answer }: FaqItemProps) => {
  const [open, setOpen] = useState(false);
  const buttonId = `faq-button-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <div>
      <button
        type='button'
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(previous => !previous)}
        className='flex min-h-[64px] w-full items-center gap-4 px-6 py-4 text-left transition-colors duration-200 hover:bg-zinc-900/60'
      >
        <span
          aria-hidden='true'
          className={clsx(
            'font-mono text-xs text-zinc-400 transition-colors duration-200',
            open && 'text-primary-400'
          )}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className='flex-1 text-base font-medium text-zinc-100'>{question}</span>
        <Plus
          size={18}
          aria-hidden='true'
          className={clsx(
            'shrink-0 text-primary-400 transition-transform duration-300',
            open && 'rotate-45'
          )}
        />
      </button>
      <div
        id={panelId}
        role='region'
        aria-labelledby={buttonId}
        className={clsx(
          'grid transition-all duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className='overflow-hidden'>
          <p className='px-6 pr-12 pb-6 pl-[52px] text-sm leading-relaxed text-zinc-300'>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
