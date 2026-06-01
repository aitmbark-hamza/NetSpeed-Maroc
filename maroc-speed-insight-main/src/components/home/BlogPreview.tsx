import { useEffect, useState, Suspense, lazy } from "react";
import { Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { loadBlogArticles } from "@/lib/tools";

function BlogPreviewSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex h-full flex-col rounded-2xl border border-border/50 bg-card/50 p-6 animate-pulse">
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="mt-3 h-5 w-full bg-muted rounded" />
          <div className="mt-2 h-12 w-full bg-muted rounded" />
          <div className="mt-4 h-3 w-20 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}

export function BlogPreview() {
  const [posts, setPosts] = useState<any[] | null>(null);

  useEffect(() => {
    // Lazy load posts after initial render
    loadBlogArticles().then(setPosts);
  }, []);

  if (!posts) {
    return (
      <Section>
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From the blog</h2>
              <p className="mt-3 text-muted-foreground">Guides and explainers on networking, WiFi and online security.</p>
            </div>
            <Link to="/blog" className="hidden text-sm font-medium text-primary hover:underline sm:inline">View all →</Link>
          </div>
        </Reveal>
        <BlogPreviewSkeleton />
      </Section>
    );
  }

  return (
    <Section>
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From the blog</h2>
            <p className="mt-3 text-muted-foreground">Guides and explainers on networking, WiFi and online security.</p>
          </div>
          <Link to="/blog" className="hidden text-sm font-medium text-primary hover:underline sm:inline">View all →</Link>
        </div>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <span className="text-xs font-medium text-accent">{p.category}</span>
              <h3 className="mt-3 text-base font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-4 text-xs text-muted-foreground">{p.readTime}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
