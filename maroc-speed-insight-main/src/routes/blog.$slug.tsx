import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { POSTS, type Post } from "@/lib/tools";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const post = loaderData;
    if (!post) return { meta: [{ title: "Article not found — NetSpeed Maroc" }] };
    const url = `${SITE_URL}/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} | NetSpeed Maroc` },
        { name: "description", content: post.excerpt },
        { name: "keywords", content: `${post.category}, internet, networking, morocco` },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Organization", name: "NetSpeed Maroc" },
            publisher: { "@type": "Organization", name: "NetSpeed Maroc" },
            mainEntityOfPage: url,
            articleSection: post.category,
          }),
        },
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <Layout>
      <Section className="pt-20 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">← Back to blog</Link>
      </Section>
    </Layout>
  ),
});

function BlogPost() {
  const post = Route.useLoaderData() as Post;
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <Section className="pt-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>
        <Reveal>
          <article className="mt-6 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">{post.category}</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
            </div>
            <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>
            <div className="mt-10 space-y-10">
              {post.body.map((section) => (
                <section key={section.h2}>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.h2}</h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                    {section.p.map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </Reveal>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">Continue reading</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                <span className="text-xs font-medium text-accent">{p.category}</span>
                <h3 className="mt-2 text-base font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </Layout>
  );
}
