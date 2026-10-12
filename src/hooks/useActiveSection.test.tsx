import { useActiveSection } from './useActiveSection';

import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/** Mutable pathname so a test can simulate a client-side route change. */
let pathname = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
}));

/** IntersectionObserver whose callbacks the test drives by hand. */
class ControllableObserver {
  static instances: ControllableObserver[] = [];

  observed: Element[] = [];
  root = null;
  rootMargin = '';
  thresholds: number[] = [];

  constructor(private readonly callback: IntersectionObserverCallback) {
    ControllableObserver.instances.push(this);
  }

  observe = (element: Element) => this.observed.push(element);
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];

  /** Reports the given ids as crossing the viewport centre. */
  enter(ids: string[]) {
    const entries = ids.map(id => ({
      isIntersecting: true,
      target: document.getElementById(id),
    })) as unknown as IntersectionObserverEntry[];

    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

const latestObserver = () => ControllableObserver.instances.at(-1) as ControllableObserver;

const Harness = ({ ids, withSections = true }: { ids: string[]; withSections?: boolean }) => {
  const activeId = useActiveSection(ids);

  return (
    <>
      {withSections &&
        ids.map(id => (
          <section key={id} id={id}>
            {id}
          </section>
        ))}
      <span data-testid='active'>{activeId ?? 'none'}</span>
    </>
  );
};

const active = () => screen.getByTestId('active').textContent;

describe('useActiveSection', () => {
  beforeEach(() => {
    pathname = '/';
    ControllableObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', ControllableObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('marks the section crossing the viewport centre as active', () => {
    render(<Harness ids={['about', 'contact']} />);

    act(() => latestObserver().enter(['about']));

    expect(active()).toBe('about');
  });

  it('clears the highlight on a route without those sections', () => {
    const ids = ['about', 'contact'];
    const { rerender } = render(<Harness ids={ids} />);

    act(() => latestObserver().enter(['about']));
    expect(active()).toBe('about');

    // Client-side navigation to a page that has none of the homepage sections.
    pathname = '/privacy';
    rerender(<Harness ids={ids} withSections={false} />);

    expect(active()).toBe('none');
  });

  it('observes the newly mounted sections after coming back home', () => {
    const ids = ['about', 'contact'];
    const { rerender } = render(<Harness ids={ids} />);

    act(() => latestObserver().enter(['about']));

    pathname = '/privacy';
    rerender(<Harness ids={ids} withSections={false} />);

    const observersBeforeReturn = ControllableObserver.instances.length;

    pathname = '/';
    rerender(<Harness ids={ids} />);

    // A fresh observer watches the elements that exist right now — the previous
    // one was left holding detached nodes, which is what froze the highlight.
    expect(ControllableObserver.instances.length).toBeGreaterThan(observersBeforeReturn);
    const freshObserver = latestObserver();
    expect(freshObserver.observed).toContain(document.getElementById('about'));

    act(() => freshObserver.enter(['contact']));
    expect(active()).toBe('contact');
  });
});
