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
  WritingSection,
} from './components/Sections';
import { getPost, type Post } from './data/posts';
import { PostPage } from './pages/PostPage';

interface RouteState {
  tab: ActiveTab;
  postSlug: string | null;
}

function parseLocationHash(): RouteState {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw || raw === '/') return { tab: 'home', postSlug: null };
  const postMatch = raw.match(/^post\/([^/]+)/);
  if (postMatch) {
    return { tab: 'writing', postSlug: postMatch[1] };
  }
  if (raw === 'projects' || raw === 'experience' || raw === 'writing' || raw === 'contact') {
    return { tab: raw, postSlug: null };
  }
  return { tab: 'home', postSlug: null };
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseLocationHash());
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('sri-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
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
      localStorage.setItem('sri-theme', theme);
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
    const onHash = () => setRoute(parseLocationHash());
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
    setRoute({ tab, postSlug: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPost = (post: Post) => {
    window.location.hash = `#/post/${post.slug}`;
    setRoute({ tab: 'writing', postSlug: post.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activePost = route.postSlug ? getPost(route.postSlug) : undefined;

  return (
    <div className="relative min-h-screen bg-[var(--bg)] font-sans text-[var(--fg)] antialiased transition-colors duration-300">
      <Header
        activeTab={route.tab}
        onSelectTab={selectTab}
        onOpenPalette={() => setPaletteOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <SideNavigation visible={route.tab === 'home' && !activePost} />

      <main className="relative z-10">
        {activePost ? (
          <PostPage post={activePost} onBack={() => selectTab('writing')} />
        ) : route.tab === 'projects' ? (
          <ProjectsSection searchable />
        ) : route.tab === 'experience' ? (
          <>
            <ExperienceSection detailed />
            <SpeakingSection />
          </>
        ) : route.tab === 'writing' ? (
          <>
            <WritingSection onSelectPost={openPost} />
            <SpeakingSection />
          </>
        ) : route.tab === 'contact' ? (
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
            <WritingSection
              limit={4}
              onSelectPost={openPost}
              onViewAll={() => selectTab('writing')}
            />
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
