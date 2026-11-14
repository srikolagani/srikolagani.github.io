import ReactMarkdown from 'react-markdown';
import { Container, SectionHeader } from '../components/Frame';
import type { Post } from '../data/posts';

type Props = {
  post: Post;
  onBack: () => void;
};

export function PostPage({ post, onBack }: Props) {
  return (
    <article>
      <SectionHeader
        title="Engineering Note"
        aside={
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            ← Back to Notes
          </button>
        }
      />
      <Container className="px-6 py-8 sm:px-8">
        <header className="mb-8 border-b border-[var(--line)] pb-6">
          <time className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--soft)]">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 font-serif text-3xl font-normal leading-tight text-[var(--fg)] sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-[var(--line)] bg-[var(--chip)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-[14.5px] leading-7 text-[var(--muted)] prose-headings:font-serif prose-headings:font-normal prose-headings:text-[var(--fg)] prose-a:text-[var(--fg)] prose-a:underline prose-strong:text-[var(--fg)] prose-code:rounded prose-code:bg-[var(--chip)] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[12.5px] prose-code:text-[var(--fg)] prose-pre:border prose-pre:border-[var(--line)] prose-pre:bg-[#0b0b0d]">
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </Container>
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
