import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { generateMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/config";
import { Grid, Zap, Globe, Lock, Wifi, Radio } from "lucide-react";

export const Route = createFileRoute("/tools")({
  head: () => {
    const { meta, links } = generateMetadata({
      title: "All Internet Tools | NetSpeed Maroc",
      description:
        "Complete collection of free internet diagnostic tools: speed test, IP checker, DNS lookup, ping test, QR code generator, and password generator.",
      canonical: `${SITE_URL}/tools`,
      keywords: "internet tools, speed test, IP checker, DNS lookup, ping test, network tools",
    });

    return {
      meta,
      links,
    };
  },
  component: Tools,
});

const TOOLS = [
  {
    title: "IP Checker",
    description: "Find your public IP address, ISP, location, and network details.",
    href: "/ip-checker",
    icon: Globe,
    category: "Network",
  },
  {
    title: "Speed Test",
    description: "Test your internet connection speed with accurate download and upload measurements.",
    href: "/speed-test",
    icon: Zap,
    category: "Network",
  },
  {
    title: "DNS Lookup",
    description: "Look up DNS records (A, AAAA, MX, TXT, CNAME) for any domain.",
    href: "/dns-lookup",
    icon: Radio,
    category: "Network",
  },
  {
    title: "Ping Test",
    description: "Test connection latency and packet loss to any server.",
    href: "/ping-test",
    icon: Wifi,
    category: "Network",
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes from text, URLs, contact information, and more.",
    href: "/qr-generator",
    icon: Grid,
    category: "Utilities",
  },
  {
    title: "Password Generator",
    description: "Create secure, random passwords with customizable length and character types.",
    href: "/password-generator",
    icon: Lock,
    category: "Security",
  },
];

function Tools() {
  const categories = [...new Set(TOOLS.map((t) => t.category))];

  return (
    <Layout>
      <Section className="py-16">
        <Reveal>
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">All Internet Tools</h1>
              <p className="text-xl text-muted-foreground">
                A complete collection of free online tools for internet diagnostics, testing, and
                utilities.
              </p>
            </div>

            {categories.map((category) => (
              <div key={category} className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">{category}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {TOOLS.filter((t) => t.category === category).map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        to={tool.href}
                        className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                {tool.title}
                              </h3>
                              <p className="mt-2 text-sm text-muted-foreground">
                                {tool.description}
                              </p>
                            </div>
                            <Icon className="ml-4 h-8 w-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                            Use Tool →
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <section className="rounded-lg border border-border bg-accent/50 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Pro Tips</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Run speed tests multiple times for the most accurate results</li>
                <li>• Check your IP address if you suspect privacy or security issues</li>
                <li>• Use DNS lookup to troubleshoot domain connectivity problems</li>
                <li>• Test ping to diagnose network latency issues</li>
                <li>• Generate strong passwords using our secure password tool</li>
              </ul>
            </section>
          </div>
        </Reveal>
      </Section>
    </Layout>
  );
}
