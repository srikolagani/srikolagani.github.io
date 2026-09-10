import type { ReactNode } from 'react';
import { SITE } from '../data/posts';

type Props = {
  children: ReactNode;
  onHome: () => void;
};

export function Layout({ children, onHome }: Props) {
  return (
    <div className="min-h-screen bg-ink-50 text-ink-900">
      <header className="border-b border-ink-300/60">
        <div className="mx-auto flex max-w-site items-baseline justify-between gap-6 px-6 py-10 md:px-8">
          <div>
            <button
              type="button"
              onClick={onHome}
              className="font-serif text-2xl font-semibold tracking-tight text-ink-950 hover:text-ink-700"
            >
              {SITE.title}
            </button>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">{SITE.tagline}</p>
          </div>
          <nav className="flex shrink-0 gap-4 text-sm text-ink-500">
            <button type="button" onClick={onHome} className="hover:text-ink-900">
              Notes
            </button>
            <a href={SITE.kitUrl} className="hover:text-ink-900" target="_blank" rel="noreferrer">
              crm-agent-kit
            </a>
            <a href={SITE.githubUrl} className="hover:text-ink-900" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-site px-6 py-14 md:px-8 md:py-16">{children}</main>

      <footer className="border-t border-ink-300/60">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-6 py-10 text-sm text-ink-500 md:px-8">
          <p>© {new Date().getFullYear()} Sri Kolagani</p>
          <p>
            Open source:{' '}
            <a className="underline underline-offset-2 hover:text-ink-900" href={SITE.kitUrl}>
              @srikolagani/crm-agent-kit
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
