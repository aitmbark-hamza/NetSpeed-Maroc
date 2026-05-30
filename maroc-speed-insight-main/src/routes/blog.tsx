import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/lib/tools";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Networking, WiFi & Internet Guides | NetSpeed Maroc" },
      { name: "description", content: "Practical, plain-English guides on IP addresses, WiFi, DNS, ping and online security — written for users in Morocco." },
      { property: "og:title", content: "NetSpeed Maroc Blog" },
      { property: "og:description", content: "Guides on networking, WiFi and online security." },
      { property: "og:url", content: `${SITE_URL}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: Blog,
});

function Blog() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);
  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Resources
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Internet, simplified.</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Plain-English guides on IP addresses, WiFi, DNS, ping and online security — written for everyone, not just engineers.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/40 lg:grid-cols-2"
          >
            <div className="hero-bg min-h-48 lg:min-h-full" aria-hidden />
            <div className="p-8 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Featured · {featured.category}</span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featured.readTime}</span>
              </div>
            </div>
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="block h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span className="text-xs font-medium text-accent">{p.category}</span>
                <h2 className="mt-3 text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span>·</span>
                  <span>{p.readTime}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
