import React from 'react';

export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[760px] border-x border-dashed border-[var(--line)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  aside,
  id,
}: {
  title: string;
  aside?: React.ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="relative w-full border-y border-[var(--line)] bg-stripes">
      <Container className="bg-[var(--bg)]">
        <span className="absolute left-0 top-0 z-20 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)] opacity-75" />
        <span className="absolute right-0 top-0 z-20 h-[4px] w-[4px] translate-x-1/2 -translate-y-1/2 bg-[var(--accent)] opacity-75" />
        <span className="absolute bottom-0 left-0 z-20 h-[4px] w-[4px] -translate-x-1/2 translate-y-1/2 bg-[var(--accent)] opacity-75" />
        <span className="absolute bottom-0 right-0 z-20 h-[4px] w-[4px] translate-x-1/2 translate-y-1/2 bg-[var(--accent)] opacity-75" />
        <div className="flex w-full items-center justify-between gap-4 px-6 py-3 sm:px-8">
          <h2 className="font-serif text-2xl tracking-wide text-[var(--fg)]">{title}</h2>
          {aside}
        </div>
      </Container>
    </div>
  );
}

export function StripeDivider({
  h = 'h-7',
  className = '',
}: {
  h?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full bg-stripes ${h} ${className}`}>
      <Container className="h-full bg-[var(--bg)]">
        <span className="sr-only" />
      </Container>
    </div>
  );
}
