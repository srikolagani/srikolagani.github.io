import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { getPost } from './data/posts';
import { Home } from './pages/Home';
import { PostPage } from './pages/PostPage';

function parseHash(): string | null {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw || raw === '/') return null;
  const match = raw.match(/^post\/([^/]+)/);
  return match?.[1] ?? null;
}

function App() {
  const [slug, setSlug] = useState<string | null>(() => parseHash());

  useEffect(() => {
    const onHash = () => setSlug(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goHome = () => {
    window.location.hash = '#/';
    setSlug(null);
  };

  const openPost = (next: string) => {
    window.location.hash = `#/post/${next}`;
    setSlug(next);
  };

  const post = slug ? getPost(slug) : undefined;

  return (
    <Layout onHome={goHome}>
      {slug && post ? (
        <PostPage post={post} onBack={goHome} />
      ) : slug && !post ? (
        <div className="max-w-prose">
          <p className="font-serif text-2xl text-ink-950">Note not found.</p>
          <button
            type="button"
            onClick={goHome}
            className="mt-6 text-sm underline underline-offset-4 text-ink-500 hover:text-ink-900"
          >
            ← Back to notes
          </button>
        </div>
      ) : (
        <Home onOpen={openPost} />
      )}
    </Layout>
  );
}

export default App;
