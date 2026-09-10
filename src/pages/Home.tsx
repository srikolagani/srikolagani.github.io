import { PostCard } from '../components/PostCard';
import { posts, SITE } from '../data/posts';

type Props = {
  onOpen: (slug: string) => void;
};

export function Home({ onOpen }: Props) {
  return (
    <div>
      <section className="mb-14 max-w-prose">
        <p className="font-serif text-xl leading-relaxed text-ink-700 md:text-2xl md:leading-relaxed">
          A quiet place for write-ups on agentic CRM patterns, evaluation discipline, and the
          open-source kit that accompanies the work.
        </p>
        <p className="mt-6 text-sm text-ink-500">
          Latest library:{' '}
          <a className="underline underline-offset-2 hover:text-ink-900" href={SITE.kitUrl}>
            crm-agent-kit
          </a>{' '}
          on GitHub.
        </p>
      </section>

      <section aria-label="Notes">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} onOpen={onOpen} />
        ))}
      </section>
    </div>
  );
}
