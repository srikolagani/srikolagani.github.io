import { useCallback, useEffect, useState } from 'react';
import {
  AboutSection,
  type ActiveTab,
  CommandPalette,
  ContactPageSection,
  ExperienceSection,
  Footer,
  GitHubActivitySection,
  Header,
  HeroSection,
  ProjectsSection,
  QuickContactGrid,
  SideNavigation,
  SpeakingSection,
  TechStackSection,
} from './components/Sections';

function parseLocationHash(): ActiveTab {
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  if (raw === 'projects' || raw === 'experience' || raw === 'contact') {
    return raw;
  }
  return 'home';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => parseLocationHash());
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('sri-theme-anthropic') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    try {
      localStorage.setItem('sri-theme-anthropic', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback((coords?: { x: number; y: number }) => {
    const root = document.documentElement;
    if (coords) {
      root.style.setProperty('--theme-x', `${coords.x}px`);
      root.style.setProperty('--theme-y', `${coords.y}px`);
    }
    const docWithVT = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (docWithVT.startViewTransition) {
      docWithVT.startViewTransition(() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
      });
    } else {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  }, []);

  useEffect(() => {
    const onHash = () => setActiveTab(parseLocationHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const selectTab = (tab: ActiveTab) => {
    window.location.hash = tab === 'home' ? '#/' : `#/${tab}`;
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] font-sans text-[var(--fg)] antialiased transition-colors duration-300">
      <Header
        activeTab={activeTab}
        onSelectTab={selectTab}
        onOpenPalette={() => setPaletteOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <SideNavigation visible={activeTab === 'home'} />

      <main className="relative z-10">
        {activeTab === 'projects' ? (
          <ProjectsSection searchable />
        ) : activeTab === 'experience' ? (
          <>
            <ExperienceSection detailed />
            <SpeakingSection />
          </>
        ) : activeTab === 'contact' ? (
          <>
            <QuickContactGrid />
            <ContactPageSection />
          </>
        ) : (
          <>
            <HeroSection
              onOpenPalette={() => setPaletteOpen(true)}
              onNavigateContact={() => selectTab('contact')}
            />
            <AboutSection />
            <QuickContactGrid />
            <ProjectsSection />
            <ExperienceSection />
            <SpeakingSection />
            <TechStackSection />
            <GitHubActivitySection />
          </>
        )}
      </main>

      <Footer />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectTab={selectTab}
        onToggleTheme={() => toggleTheme()}
        theme={theme}
      />
    </div>
  );
}
