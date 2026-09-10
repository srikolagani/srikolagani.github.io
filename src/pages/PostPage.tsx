import ReactMarkdown from 'react-markdown';
import type { Post } from '../data/posts';

type Props = {
  post: Post;
  onBack: () => void;
};

export function PostPage({ post, onBack }: Props) {
  return (
    <article>
      <button
        type="button"
        onClick={onBack}
        className="mb-10 text-sm text-ink-500 underline underline-offset-4 hover:text-ink-900"
      >
        ← All notes
      </button>

      <header className="mb-10 max-w-prose">
        <time className="text-xs uppercase tracking-[0.14em] text-ink-500">{formatDate(post.date)}</time>
        <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink-950 md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-700">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-500">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-editorial">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>
    </article>
  );
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
