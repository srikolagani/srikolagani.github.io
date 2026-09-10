import type { Post } from '../data/posts';

type Props = {
  post: Post;
  onOpen: (slug: string) => void;
};

export function PostCard({ post, onOpen }: Props) {
  return (
    <article className="group border-b border-ink-300/50 py-10 first:pt-0 last:border-b-0">
      <time className="text-xs uppercase tracking-[0.14em] text-ink-500">{formatDate(post.date)}</time>
      <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug tracking-tight text-ink-950 md:text-[1.75rem]">
        <button
          type="button"
          onClick={() => onOpen(post.slug)}
          className="text-left transition-colors hover:text-ink-700"
        >
          {post.title}
        </button>
      </h2>
      <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-700">{post.excerpt}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-500">
            {tag}
          </span>
        ))}
        <button
          type="button"
          onClick={() => onOpen(post.slug)}
          className="text-sm text-ink-700 underline underline-offset-4 group-hover:text-ink-950"
        >
          Read note
        </button>
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
