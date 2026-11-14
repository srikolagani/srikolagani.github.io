import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PORTFOLIO, type ProjectItem } from '../data/portfolio';
import { F1GameBanner } from './F1Game';
import { Container, SectionHeader, StripeDivider } from './Frame';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SectionNavIcons,
  SunIcon,
} from './Icons';

export type ActiveTab = 'home' | 'projects' | 'experience' | 'contact';

export function Header({
  activeTab,
  onSelectTab,
  onOpenPalette,
  theme,
  onToggleTheme,
}: {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenPalette: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (coords?: { x: number; y: number }) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: { label: string; tab: ActiveTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Projects', tab: 'projects' },
    { label: 'Experience', tab: 'experience' },
    { label: 'Contact', tab: 'contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 mx-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'mt-2 w-[763px] max-w-[calc(100%-24px)] border border-[var(--line)] bg-[var(--bg)]/90 shadow-2xl backdrop-blur-md'
            : 'mt-0 w-full rounded-none border-b border-[var(--line)] bg-[var(--bg)]/85 shadow-none backdrop-blur-md'
        }`}
      >
        <Container className="flex items-center justify-between px-6 py-3.5 sm:px-8">
          <button
            type="button"
            onClick={() => {
              onSelectTab('home');
              setMobileOpen(false);
            }}
            className="group flex cursor-pointer items-center gap-2.5 text-left transition-opacity hover:opacity-85"
          >
            <span className="relative size-6 shrink-0 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--chip)]">
              <img
                src={PORTFOLIO.avatar}
                alt={PORTFOLIO.name}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="font-serif text-lg tracking-wide text-[var(--fg)] sm:text-xl">
              {PORTFOLIO.name}
            </span>
            <span className="hidden rounded border border-[var(--line)] bg-[var(--chip)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--soft)] sm:inline-block">
              ~/sri
            </span>
          </button>

          <nav className="hidden items-center gap-5 text-[13px] text-[var(--muted)] sm:flex">
            {navItems.map(({ label, tab }) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onSelectTab(tab)}
                  className={`group relative cursor-pointer transition-colors hover:text-[var(--fg)] ${
                    active ? 'font-semibold text-[var(--fg)]' : ''
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 ${
                      active ? 'origin-left scale-x-100' : ''
                    }`}
                  />
                </button>
              );
            })}

            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Open Command Palette"
              className="grid size-7 cursor-pointer place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:text-[var(--fg)]"
            >
              <SearchIcon className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onToggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
              }}
              aria-label="Toggle theme"
              className="grid size-7 cursor-pointer place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:rotate-45 hover:text-[var(--fg)]"
            >
              {isDark ? <SunIcon className="size-3.5" /> : <MoonIcon className="size-3.5" />}
            </button>
          </nav>

          <div className="flex items-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Open Command Palette"
              className="grid size-8 cursor-pointer place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]"
            >
              <SearchIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onToggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
              }}
              aria-label="Toggle theme"
              className="grid size-8 cursor-pointer place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]"
            >
              {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle Mobile Menu"
              className="grid size-8 cursor-pointer place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]"
            >
              {mobileOpen ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
            </button>
          </div>
        </Container>

        {mobileOpen && (
          <div className="absolute left-0 top-full z-50 w-full overflow-hidden border-b border-[var(--line)] bg-[var(--bg)] shadow-lg sm:hidden">
            <div className="flex flex-col space-y-4 px-6 py-6 font-serif text-lg">
              {navItems.map(({ label, tab }) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      onSelectTab(tab);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-2 border-b border-dashed border-[var(--line)]/50 pb-2.5 text-left transition-colors ${
                      active ? 'font-semibold text-[var(--fg)]' : 'text-[var(--muted)]'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full bg-[var(--fg)] ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>
      <div className="h-[64px]" />
    </>
  );
}

const SIDE_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
];

export function SideNavigation({ visible }: { visible: boolean }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!visible) return;
    const onScroll = () => {
      const y = window.scrollY + 180;
      let found = '';
      for (const sec of SIDE_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y >= top && y < bottom) {
          found = sec.id;
          break;
        }
      }
      setActiveId(found);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  if (!visible) return null;

  return (
    <aside className="group fixed left-[calc(50%+400px)] top-[22vh] z-30 hidden w-10 transition-[width] duration-300 ease-out hover:w-[170px] xl:block">
      <div className="mb-2 h-6 overflow-hidden whitespace-nowrap px-2">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--soft)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          On this page
        </span>
      </div>
      <nav className="flex flex-col gap-[2px]">
        {SIDE_SECTIONS.map((sec) => {
          const Icon = SectionNavIcons[sec.id] || SectionNavIcons.about;
          const active = activeId === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              title={sec.label}
              className={`group/item flex h-8 w-full items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-md px-2 font-sans text-[12px] transition-all duration-200 ${
                active
                  ? 'bg-[var(--hover)] text-[var(--fg)]'
                  : 'text-[var(--soft)] hover:bg-[var(--hover)] hover:text-[var(--fg)]'
              }`}
            >
              <Icon
                className={`size-4 shrink-0 transition-colors duration-200 ${
                  active ? 'text-[var(--fg)]' : 'text-[var(--soft)] group-hover/item:text-[var(--fg)]'
                }`}
              />
              <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-w-[120px] group-hover:opacity-100">
                {sec.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export function HeroSection({
  onOpenPalette,
  onNavigateContact,
}: {
  onOpenPalette: () => void;
  onNavigateContact: () => void;
}) {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % PORTFOLIO.roles.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <Container>
        <F1GameBanner onNavigateContact={onNavigateContact} />
      </Container>
      <Container className="px-6 py-6 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-center sm:text-left">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
            <div className="group relative grid size-20 shrink-0 select-none place-items-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--chip)] shadow-md">
              <img
                src={PORTFOLIO.avatar}
                alt={PORTFOLIO.name}
                loading="eager"
                className="pointer-events-none h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-[0.18] transition-opacity group-hover:opacity-30">
                <div className="animate-scanline absolute inset-0 h-1 bg-white/20 blur-[1px]" />
              </div>
            </div>

            <div>
              <h1 className="text-glitch font-serif text-3xl leading-none tracking-tight text-[var(--fg)] sm:text-[38px]">
                {PORTFOLIO.name}
              </h1>
              <div className="mt-1.5 h-[20px] overflow-hidden">
                <p
                  key={roleIdx}
                  className="animate-fade-up font-mono text-[12.5px] text-[var(--muted)]"
                >
                  {PORTFOLIO.roles[roleIdx]}
                </p>
              </div>
              <p className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] text-[var(--soft)] sm:justify-start">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="size-3 shrink-0" />
                  {PORTFOLIO.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>Elastic · Enterprise Apps, RevOps & AI GTM</span>
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPalette}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 font-mono text-[11px] text-[var(--muted)] shadow-sm transition-colors hover:border-[var(--soft)] hover:text-[var(--fg)]"
          >
            <SearchIcon className="size-3.5" />
            <span>⌘K</span>
          </button>
        </div>
      </Container>
    </div>
  );
}

export function AboutSection() {
  return (
    <div id="about">
      <SectionHeader title="About" />
      <Container className="space-y-4 px-6 py-7 sm:px-8">
        {PORTFOLIO.about.map((para, idx) => (
          <div key={idx} className="flex gap-2.5 text-[14.5px] leading-relaxed text-[var(--muted)]">
            <span className="font-mono text-[var(--soft)]">•</span>
            <p>{para}</p>
          </div>
        ))}

        <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--fg)]">
            Executive & Engineering Snapshot
          </p>
          <ul className="grid grid-cols-1 gap-2 font-mono text-[12.5px] text-[var(--muted)] sm:grid-cols-2">
            {PORTFOLIO.tldr.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

export function QuickContactGrid() {
  const links = [
    { label: 'GitHub', href: PORTFOLIO.socials.github, Icon: GitHubIcon },
    { label: 'LinkedIn', href: PORTFOLIO.socials.linkedin, Icon: LinkedInIcon },
    { label: 'Mail', href: PORTFOLIO.socials.email, Icon: MailIcon },
    { label: 'Resume', href: PORTFOLIO.socials.resume, Icon: FileTextIcon },
  ];

  return (
    <div id="contact">
      <SectionHeader title="Contact" />
      <Container>
        <div className="grid grid-cols-2 border-b border-[var(--line)] sm:grid-cols-4 sm:border-b-0">
          {links.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`group flex items-center justify-center gap-2.5 border-[var(--line)] px-4 py-4 text-[13px] font-medium transition-colors duration-200 hover:bg-[var(--hover)] ${
                  idx % 2 === 0 ? 'border-r' : 'border-r-0'
                } ${idx < 2 ? 'border-b' : 'border-b-0'} sm:border-b-0 ${
                  idx === links.length - 1 ? 'sm:border-r-0' : 'sm:border-r'
                }`}
              >
                <span className="grid size-8 place-items-center rounded-lg border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                  <Icon className="size-4" />
                </span>
                <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                  {item.label}
                </span>
                <ArrowUpRightIcon className="size-3.5 text-[var(--soft)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
              </a>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

function ProjectPreviewGraphic({ project }: { project: ProjectItem }) {
  const isGlassforce = project.title === 'Glassforce';
  return (
    <div className="relative mb-4 flex h-48 w-full flex-col justify-between overflow-hidden rounded-lg border border-[var(--line)] bg-gradient-to-br from-[var(--chip)] via-[var(--card)] to-[var(--bg)]/40 p-3.5">
      <div className="bg-stripes pointer-events-none absolute inset-0 opacity-20" />

      {/* Camera viewfinder overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-10 font-mono text-[9px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute left-2.5 top-2.5 h-2.5 w-2.5 border-l border-t border-white/70" />
        <div className="absolute right-2.5 top-2.5 h-2.5 w-2.5 border-r border-t border-white/70" />
        <div className="absolute bottom-2.5 left-2.5 h-2.5 w-2.5 border-b border-l border-white/70" />
        <div className="absolute bottom-2.5 right-2.5 h-2.5 w-2.5 border-b border-r border-white/70" />
        <div className="absolute left-7 top-2.5 flex items-center gap-1 text-[8px] font-semibold text-white/80">
          <span className="size-1.5 animate-pulse rounded-full bg-rose-500" /> REC
        </div>
        <div className="absolute right-7 top-2.5 text-[8px] font-semibold text-white/80">
          {isGlassforce ? 'RUST · TAURI 2' : 'SWIFTUI · MCP'}
        </div>
      </div>

      {/* Top badges */}
      <div className="relative z-20 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 rounded border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          {project.status || 'Live'}
        </span>
        {project.featured && (
          <span className="rounded border border-amber-500/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-400">
            Featured
          </span>
        )}
      </div>

      {/* Stylized App Window Mockup in bottom right */}
      <div className="pointer-events-none absolute -bottom-3 -right-4 h-32 w-60 overflow-hidden rounded-lg border border-[var(--line)] bg-[#0c0d12] p-2.5 shadow-2xl transition-all duration-300 group-hover:-bottom-1 group-hover:-right-2 sm:w-64">
        <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-1.5">
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-rose-500/80" />
            <span className="size-2 rounded-full bg-amber-400/80" />
            <span className="size-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">
            {isGlassforce ? 'glassforce — soql studio' : 'tinycrm — relationship inbox'}
          </span>
        </div>
        {isGlassforce ? (
          <div className="space-y-1.5 font-mono text-[9px]">
            <div className="text-sky-400">
              SELECT <span className="text-emerald-300">Id, Name, StageName, ARR__c</span>
            </div>
            <div className="text-purple-300">
              FROM <span className="text-amber-300">Opportunity</span> WHERE IsWon = true
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 rounded border border-white/10 bg-white/5 p-1 text-[8px] text-white/75">
              <span>Elastic AI</span>
              <span className="text-emerald-400">Closed Won</span>
              <span className="text-right">$420K</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 font-mono text-[9px]">
            <div className="flex items-center justify-between rounded border border-amber-400/30 bg-amber-500/10 px-1.5 py-1 text-[8px] text-amber-200">
              <span>AI Live Session Review</span>
              <span className="text-emerald-400">[Accept ⌘↵]</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[8px] text-white/75">
              <div className="rounded border border-white/10 bg-white/5 p-1">
                <div className="font-semibold text-white">MCP Server</div>
                <div className="text-emerald-400">● 67/67 Tests</div>
              </div>
              <div className="rounded border border-white/10 bg-white/5 p-1">
                <div className="font-semibold text-white">macOS + iPad</div>
                <div className="text-sky-400">SwiftUI Sync</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-20 self-start">
        <span className="font-serif text-2xl tracking-wide text-[var(--fg)]">{project.title}</span>
      </div>
    </div>
  );
}

export function ProjectsSection({ searchable = false }: { searchable?: boolean }) {
  const [filter, setFilter] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Native & Desktop', 'AI & Agents', 'Fullstack'];

  const filtered = PORTFOLIO.projects.filter((p) => {
    if (filter !== 'All' && !p.categories.includes(filter as ProjectItem['categories'][number])) {
      return false;
    }
    if (searchable && query.trim()) {
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  return (
    <>
      <div id="projects">
        <SectionHeader
          title="Projects"
          aside={
            <div className="flex flex-wrap gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-0.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200 ${
                    filter === cat
                      ? 'bg-[var(--fg)] font-semibold text-[var(--bg)] shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--fg)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          }
        />

        <Container className="px-6 py-6 sm:px-8">
          {searchable && (
            <div className="mb-6 flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <SearchIcon className="-translate-y-1/2 absolute left-3 top-1/2 size-4 text-[var(--soft)]" />
                <input
                  type="text"
                  placeholder="Search Glassforce, TinyCRM, stack..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border border-[var(--line)] bg-[var(--chip)] py-2 pl-9 pr-8 text-[12.5px] text-[var(--fg)] outline-none placeholder:text-[var(--soft)] focus:border-[var(--soft)]"
                />
              </div>
              <span className="font-mono text-[11px] text-[var(--soft)]">
                Showing {filtered.length} of {PORTFOLIO.projects.length} featured projects
              </span>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((project) => (
              <div
                key={project.title}
                onClick={() => setSelected(project)}
                className="group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--soft)] hover:shadow-md"
              >
                <div>
                  <ProjectPreviewGraphic project={project} />
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[16.5px] font-semibold tracking-wide text-[var(--fg)]">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-[var(--soft)]">{project.year}</span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                    {project.blurb}
                  </p>
                  <ul className="mt-3 space-y-1 border-t border-dashed border-[var(--line)]/60 pt-2.5 font-mono text-[11px] text-[var(--muted)]">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--line)]/50 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[var(--line)]/30 bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex shrink-0 items-center gap-2.5 text-[var(--soft)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.links.live && (
            <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live website`}
                        className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
                      >
                        <ExternalLinkIcon className="size-4" />
                      </a>
                    )}
                    {project.links.source && (
                      <a
                        href={project.links.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
                      >
                        <GitHubIcon className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-[var(--line)] py-12 text-center">
              <p className="font-mono text-xs text-[var(--soft)]">
                No projects match &ldquo;{query}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter('All');
                  setQuery('');
                }}
                className="mt-3 cursor-pointer rounded-md border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 font-mono text-xs text-[var(--fg)]"
              >
                Reset filters
              </button>
            </div>
          )}
        </Container>
      </div>

      {selected &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelected(null)}
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="relative z-[10000] flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--line)] px-5 py-4 sm:px-7">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  <span>Project</span>
                  <span>/</span>
                  <span>{selected.year}</span>
                  <span>/</span>
                  <span className="text-[var(--fg)]">{selected.status}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-[var(--line)] text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>

              <div className="min-h-0 overflow-y-auto">
                <div className="border-b border-[var(--line)] p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {selected.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-serif text-3xl text-[var(--fg)] sm:text-4xl">
                    {selected.title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-7 text-[var(--muted)]">{selected.blurb}</p>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {selected.links.live && (
                      <a
                        href={selected.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-[var(--fg)] px-4 py-2 text-[12px] font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
                      >
                        <span>Project Website</span>
                        <ArrowUpRightIcon className="size-3.5" />
                      </a>
                    )}
                    {selected.links.source && (
                      <a
                        href={selected.links.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--chip)] px-4 py-2 text-[12px] font-medium text-[var(--fg)] transition-colors hover:bg-[var(--hover)]"
                      >
                        <GitHubIcon className="size-4" />
                        <span>GitHub Repository</span>
                        <ExternalLinkIcon className="size-3.5" />
                      </a>
                    )}
                    {selected.links.release && (
                      <a
                        href={selected.links.release}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--chip)] px-4 py-2 text-[12px] font-medium text-[var(--fg)] transition-colors hover:bg-[var(--hover)]"
                      >
                        <span>Download macOS DMG (v0.1.0)</span>
                        <ArrowUpRightIcon className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[1fr_240px]">
                  <div className="border-b border-[var(--line)] p-6 sm:border-b-0 sm:border-r sm:p-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      Overview & Engineering
                    </span>
                    <div className="mt-4 space-y-4">
                      {selected.story.split('\n\n').map((para, i) => (
                        <p key={i} className="text-[13.5px] leading-7 text-[var(--muted)]">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      Tech Stack
                    </span>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selected.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--fg)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export function ExperienceSection({ detailed = false }: { detailed?: boolean }) {
  return (
    <div id="experience">
      <SectionHeader
        title="Experience"
        aside={
          <span className="font-mono text-[11px] text-[var(--soft)]">10+ Years Leadership</span>
        }
      />
      <Container>
        {PORTFOLIO.experience.map((exp, idx) => (
          <div
            key={`${exp.company}-${exp.role}`}
            className={`px-6 py-6 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8 ${
              idx > 0 ? 'border-t border-[var(--line)]' : ''
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="flex flex-wrap items-center gap-2 text-[15.5px] font-semibold text-[var(--fg)]">
                <span>{exp.role}</span>
                <span className="text-[var(--soft)]">·</span>
                <span className="text-[var(--muted)]">{exp.company}</span>
                {exp.url && (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${exp.company}`}
                    className="text-[var(--soft)] hover:text-[var(--fg)]"
                  >
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                )}
              </h3>
              <span className="font-mono text-[11px] text-[var(--soft)]">
                {exp.period} · {exp.location}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-[var(--muted)]">
              {exp.blurb}
            </p>
            <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-[var(--muted)]">
              {(detailed ? exp.highlights : exp.highlights.slice(0, 3)).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 font-mono text-[11px] text-[var(--soft)]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Education & Certifications Block */}
        <div className="border-t border-[var(--line)] px-6 py-6 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-widest text-[var(--soft)]">
                Education
              </span>
              <div className="mt-3 space-y-3">
                {PORTFOLIO.educationAndCerts.education.map((ed) => (
                  <div key={ed.school}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[14px] font-semibold text-[var(--fg)]">{ed.school}</p>
                      <span className="font-mono text-[11px] text-[var(--soft)]">{ed.period}</span>
                    </div>
                    <p className="text-[12.5px] text-[var(--muted)]">{ed.degree}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-widest text-[var(--soft)]">
                Certifications & Credentials
              </span>
              <ul className="mt-3 space-y-1.5 text-[12.5px] text-[var(--muted)]">
                {PORTFOLIO.educationAndCerts.certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function SpeakingSection() {
  return (
    <div id="speaking">
      <SectionHeader
        title="Speaking & Open Source"
        aside={
          <a
            href={PORTFOLIO.socials.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="group/header flex items-center gap-1.5 font-mono text-[11px] text-[var(--soft)] transition-colors hover:text-[var(--fg)]"
          >
            <span className="hidden sm:inline">Elastic Search Labs</span>
            <ArrowUpRightIcon className="size-3 text-[var(--soft)] transition-transform group-hover/header:-translate-y-0.5 group-hover/header:translate-x-0.5" />
          </a>
        }
      />
      <Container>
        <div className="divide-y divide-[var(--line)]">
          {PORTFOLIO.speakingAndPublications.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block px-6 py-5 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11.5px]">
                  <span className="font-semibold text-[var(--fg)]">{item.event}</span>
                  <span className="text-[var(--soft)]">·</span>
                  <span className="inline-flex items-center rounded-full border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-400">
                    {item.type}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-[var(--soft)] group-hover:text-[var(--fg)]">
                  <span className="hidden sm:inline">{item.year}</span>
                  <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
              <h3 className="mt-1.5 text-[15.5px] font-semibold leading-snug text-[var(--fg)] transition-colors group-hover:text-[var(--muted)]">
                {item.title}
              </h3>
              <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[var(--muted)]">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function TechStackSection() {
  const categories = ['All', ...Object.keys(PORTFOLIO.skillsByCategory)];
  const [activeCat, setActiveCat] = useState('All');

  const skills =
    activeCat === 'All'
      ? Object.values(PORTFOLIO.skillsByCategory).flat()
      : PORTFOLIO.skillsByCategory[activeCat as keyof typeof PORTFOLIO.skillsByCategory] || [];

  return (
    <div id="skills">
      <SectionHeader
        title="Tech Stack"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            ( select tab to filter )
          </span>
        }
      />
      <Container className="px-6 py-6 sm:px-8">
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
          {categories.map((cat) => {
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-[12px] font-medium transition-all duration-200 ${
                  active
                    ? 'bg-[var(--fg)] font-semibold text-[var(--bg)] shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--fg)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex cursor-default items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            >
              <span className="size-1.5 rounded-full bg-current opacity-60" />
              {skill}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}

const OPACITY_LEVELS = [0.07, 0.25, 0.45, 0.7, 1];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildFallbackContributions(username: string) {
  let hash = 5381;
  for (let i = 0; i < username.length; i++) {
    hash = (hash * 33) ^ username.charCodeAt(i);
  }
  const cells: (number | null)[] = [];
  let seed = hash >>> 0;
  for (let i = 0; i < 371; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const r = seed % 100;
    cells.push(r < 28 ? 0 : r < 55 ? 1 : r < 78 ? 2 : r < 92 ? 3 : 4);
  }
  return {
    cells,
    total: cells.reduce<number>((acc, v) => acc + (v || 0) * 2, 0),
    live: false,
  };
}

export function GitHubActivitySection() {
  const username = PORTFOLIO.github.username;
  const [data, setData] = useState(() => buildFallbackContributions(username));

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('status'))))
      .then((json) => {
        const list = json?.contributions ?? [];
        if (cancelled || list.length === 0) return;
        const pad = new Date(list[0].date).getDay();
        const cells = Array(pad)
          .fill(null)
          .concat(list.map((c: { level: number }) => c.level));
        const total =
          json?.total?.lastYear ??
          list.reduce((acc: number, c: { count: number }) => acc + c.count, 0);
        setData({ cells, total, live: true });
      })
      .catch(() => {
        // fallback stays active
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const monthLabels = Array.from({ length: 12 }, (_, i) => {
    const now = new Date();
    return MONTHS[(now.getMonth() + 1 + i) % 12];
  });

  return (
    <div id="github">
      <SectionHeader
        title="GitHub Activity"
        aside={
          <a
            href={PORTFOLIO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            <span>@{username}</span>
            <ExternalLinkIcon className="size-3" />
          </a>
        }
      />
      <Container className="px-6 py-6 sm:px-8">
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[640px]">
            <div className="mb-1.5 flex justify-between pr-8 font-mono text-[10px] text-[var(--soft)]">
              {monthLabels.map((m, i) => (
                <span key={`${m}-${i}`}>{m}</span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {data.cells.map((lvl, idx) =>
                lvl === null ? (
                  <span key={idx} className="size-[10px]" />
                ) : (
                  <span
                    key={idx}
                    className="size-[10px] rounded-[2px] bg-[var(--fg)] transition-transform duration-150 hover:scale-125"
                    style={{ opacity: OPACITY_LEVELS[lvl] ?? 0.1 }}
                  />
                )
              )}
            </div>
            <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-[var(--muted)]">
              <span>
                {data.live
                  ? `${data.total.toLocaleString()} contributions in the last year`
                  : 'Active across Glassforce, TinyCRM & AI GTM repos'}
              </span>
              <span className="flex items-center gap-1.5">
                <span>Less</span>
                {OPACITY_LEVELS.map((op) => (
                  <span
                    key={op}
                    className="size-[10px] rounded-[2px] bg-[var(--fg)]"
                    style={{ opacity: op }}
                  />
                ))}
                <span>More</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function ContactPageSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div id="contact-full">
      <SectionHeader title="Direct Contact & Collaboration" />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b border-[var(--line)] p-6 md:border-b-0 md:border-r md:p-8">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)]">
                <MailIcon className="size-5" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[var(--fg)]">Direct Inbox</h3>
                <p className="text-xs text-[var(--muted)]">
                  Enterprise AI, RevOps Engineering, Speaking & Open Source
                </p>
              </div>
            </div>

            <div className="mt-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--soft)]">
                Email Address
              </span>
              <div className="mt-2 flex items-center justify-between gap-3 border border-[var(--line)] bg-[var(--chip)] p-3">
                <a
                  href={`mailto:${PORTFOLIO.email}`}
                  className="truncate font-mono text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {PORTFOLIO.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="shrink-0 cursor-pointer border border-[var(--line)] bg-[var(--bg)] p-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <CheckIcon className="size-3.5 text-emerald-400" />
                  ) : (
                    <CopyIcon className="size-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-2 font-mono text-[12px] text-[var(--muted)]">
              <p>
                <span className="text-[var(--soft)]">Location:</span> {PORTFOLIO.location}
              </p>
              <p>
                <span className="text-[var(--soft)]">Phone:</span> {PORTFOLIO.phone}
              </p>
              <p>
                <span className="text-[var(--soft)]">GitHub:</span>{' '}
                <a
                  href={PORTFOLIO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-[var(--fg)]"
                >
                  github.com/srikolagani
                </a>
              </p>
              <p>
                <span className="text-[var(--soft)]">Elastic Blog:</span>{' '}
                <a
                  href={PORTFOLIO.socials.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-[var(--fg)]"
                >
                  elastic.co/search-labs/author/sri-kolagani
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 md:p-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--soft)]">
                Let&apos;s Connect
              </span>
              <h3 className="mt-3 font-serif text-3xl font-normal leading-tight text-[var(--fg)]">
                Building agentic GTM systems
                <br />
                or native tools?
              </h3>
              <p className="mt-4 text-[13.5px] leading-6 text-[var(--muted)]">
                Whether you&apos;re scaling enterprise applications, leading AI GTM engineering, or
                exploring Glassforce and TinyCRM, I&apos;d love to chat.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${PORTFOLIO.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--bg)] transition-transform hover:-translate-y-0.5"
              >
                <span>Send an Email</span>
                <ArrowRightIcon className="size-3.5" />
              </a>
              <a
                href={PORTFOLIO.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-4 py-2.5 text-[13px] font-medium text-[var(--fg)] transition-colors hover:bg-[var(--hover)]"
              >
                <FileTextIcon className="size-4" />
                <span>Download Resume PDF</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const QUOTES = [
  {
    text: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
  {
    text: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
  },
  {
    text: 'Make it work, make it right, make it fast.',
    author: 'Kent Beck',
  },
];

export function Footer() {
  const [timeStr, setTimeStr] = useState('');
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const updateClock = () => {
      try {
        setTimeStr(
          new Intl.DateTimeFormat('en-US', {
            timeZone: PORTFOLIO.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(new Date())
        );
      } catch {
        setTimeStr(new Date().toLocaleTimeString());
      }
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="w-full">
      <StripeDivider h="h-12" />
      <SectionHeader title="Scrolled Too Far" />
      <Container className="px-6 py-10 text-center sm:px-8">
        <p className="text-[14px] text-[var(--muted)]">
          If you&apos;ve read this far, let&apos;s connect on enterprise AI, GTM engineering, or
          native macOS/iOS software.
        </p>
        <a
          href={`mailto:${PORTFOLIO.email}`}
          className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-2.5 text-[13px] font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span>Let&apos;s Talk</span>
          <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </Container>

      <StripeDivider className="border-t border-[var(--line)]" />

      <div className="w-full border-y border-[var(--line)]">
        <Container className="flex min-h-[150px] select-none flex-col items-center justify-center bg-[var(--bg)] px-8 py-10 text-center">
          <span className="font-serif text-4xl leading-none text-[var(--soft)]">“</span>
          <p
            key={quoteIdx}
className="animate-fade-up mx-auto -mt-2 max-w-md font-serif text-[20px] italic leading-snug text-[var(--fg)] sm:text-[22px]"
          >
            {QUOTES[quoteIdx].text}
          </p>
          <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--soft)]">
            — {QUOTES[quoteIdx].author}
          </p>
        </Container>
      </div>

      <StripeDivider h="h-5" />

      <div className="w-full border-t border-[var(--line)]">
        <Container className="border-b-0 px-6 py-8 text-center sm:px-8">
          <p className="text-[14.5px] text-[var(--muted)]">
            Designed &amp; Engineered by{' '}
            <span className="font-semibold text-[var(--fg)]">{PORTFOLIO.name}</span>
          </p>
          <p className="mt-1.5 font-mono text-[12px] text-[var(--soft)]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="mt-2.5 flex items-center justify-center gap-2 font-mono text-[12px] text-[var(--soft)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {PORTFOLIO.location} · {timeStr || 'CST'}
          </p>
        </Container>
      </div>
    </footer>
  );
}

export function CommandPalette({
  open,
  onClose,
  onSelectTab,
  onToggleTheme,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  onSelectTab: (tab: ActiveTab) => void;
  onToggleTheme: () => void;
  theme: 'dark' | 'light';
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const actions = [
    {
      id: 'home',
      title: 'Go to Home',
      subtitle: 'Overview, F1 Grand Prix game, and highlights',
      action: () => {
        onSelectTab('home');
        onClose();
      },
    },
    {
      id: 'projects',
      title: 'Go to Projects (Glassforce & TinyCRM)',
      subtitle: 'Featured macOS, iOS, and AI agent projects',
      action: () => {
        onSelectTab('projects');
        onClose();
      },
    },
    {
      id: 'experience',
      title: 'Go to Experience & Credentials',
      subtitle: 'Elastic, Western Union, Intuitive Surgical, Hitachi',
      action: () => {
        onSelectTab('experience');
        onClose();
      },
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      subtitle: 'Direct email, LinkedIn, GitHub, and Resume PDF',
      action: () => {
        onSelectTab('contact');
        onClose();
      },
    },
    {
      id: 'glassforce',
      title: 'Open Glassforce Website',
      subtitle: 'https://srikolagani.github.io/glassforce-public/',
      action: () => {
        window.open('https://srikolagani.github.io/glassforce-public/', '_blank');
        onClose();
      },
    },
    {
      id: 'tinycrm',
      title: 'Open TinyCRM GitHub Repository',
      subtitle: 'https://github.com/srikolagani/tiny-crm',
      action: () => {
        window.open('https://github.com/srikolagani/tiny-crm', '_blank');
        onClose();
      },
    },
    {
      id: 'theme',
      title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: 'Toggle site color scheme',
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'resume',
      title: 'Download Resume PDF',
      subtitle: 'Sri Kolagani — Director of Enterprise Applications & AI GTM',
      action: () => {
        window.open(PORTFOLIO.socials.resume, '_blank');
        onClose();
      },
    },
  ].filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (actions.length ? (i + 1) % actions.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (actions.length ? (i - 1 + actions.length) % actions.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        actions[selectedIndex]?.action();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, actions, selectedIndex, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/65 p-4 pt-[14vh] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
          <SearchIcon className="size-4 text-[var(--soft)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-[13.5px] text-[var(--fg)] outline-none placeholder:text-[var(--soft)]"
          />
          <kbd className="rounded border border-[var(--line)] bg-[var(--chip)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--soft)]">
            ESC
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {actions.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors ${
                idx === selectedIndex
                  ? 'bg-[var(--hover)] text-[var(--fg)]'
                  : 'text-[var(--muted)]'
              }`}
            >
              <div>
                <div className="text-[13px] font-medium text-[var(--fg)]">{item.title}</div>
                <div className="text-[11.5px] text-[var(--soft)]">{item.subtitle}</div>
              </div>
              <ArrowRightIcon className="size-3.5 text-[var(--soft)]" />
            </button>
          ))}
          {actions.length === 0 && (
            <div className="py-8 text-center font-mono text-xs text-[var(--soft)]">
              No matching commands found.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
