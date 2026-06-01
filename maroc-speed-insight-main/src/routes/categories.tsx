import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { generateMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/config";
import { POSTS } from "@/lib/tools";

export const Route = createFileRoute("/categories")({
  head: () => {
    const { meta, links } = generateMetadata({
      title: "Blog Categories | NetSpeed Maroc",
      description:
        "Browse all blog articles organized by category: network diagnostics, internet security, WiFi optimization, and more.",
      canonical: `${SITE_URL}/categories`,
      keywords: "blog categories, networking, internet security, WiFi, DNS, IP address",
    });

    return {
      meta,
      links,
    };
  },
  component: Categories,
});

function Categories() {
  // Extract unique categories and their post counts
  const categories = Array.from(
    new Map(
      POSTS.map((post) => [
        post.category,
        {
          category: post.category,
          description: getCategoryDescription(post.category),
          count: POSTS.filter((p) => p.category === post.category).length,
          slug: post.category.toLowerCase().replace(/\s+/g, "-"),
        },
      ])
    ).values()
  ).sort((a, b) => b.count - a.count);

  return (
    <Layout>
      <Section className="py-16">
        <Reveal>
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Blog Categories</h1>
              <p className="text-xl text-muted-foreground">
                Explore articles organized by topic. Each category contains in-depth guides and
                tutorials.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/blog"
                  search={{ category: cat.category }}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {cat.category}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {cat.description}
                        </p>
                      </div>
                      <span className="ml-4 inline-flex items-center justify-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {cat.count}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      View Articles →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <section className="rounded-lg border border-border bg-accent/50 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Browse by Interest</h2>
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? Visit our{" "}
                <Link to="/blog" className="text-primary hover:underline">
                  full blog
                </Link>{" "}
                to search articles or browse all posts chronologically.
              </p>
            </section>
          </div>
        </Reveal>
      </Section>
    </Layout>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    "Internet Speed": "Learn about measuring and optimizing your internet connection speed.",
    "IP Address": "Understanding IP addresses, public vs private, and how to check yours.",
    "Network Diagnostics":
      "Troubleshooting network issues and testing connectivity.",
    "DNS": "Detailed guides about DNS, DNS lookup, and domain name resolution.",
    "Internet Security": "Security tips and best practices for safer internet usage.",
    "WiFi & Networking":
      "WiFi optimization, network setup, and troubleshooting guides.",
    "Internet Providers": "Information about ISPs and internet service providers in Morocco.",
    "Online Tools": "Guides on how to use our free online internet tools.",
  };

  return descriptions[category] || "Comprehensive guides and tutorials on this topic.";
}
