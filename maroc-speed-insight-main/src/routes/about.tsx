import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NetSpeed Maroc" },
      { name: "description", content: "NetSpeed Maroc is a free internet tools platform built for Morocco — fast, private, and reliable." },
      { property: "og:title", content: "About NetSpeed Maroc" },
      { property: "og:description", content: "Free internet tools platform for Morocco." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About NetSpeed Maroc</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="prose prose-invert mt-8 max-w-3xl space-y-5 text-muted-foreground">
            <p>NetSpeed Maroc is a free internet tools platform built for users in Morocco and across the Maghreb. We believe everyone should be able to inspect, test and understand their internet connection without installing software or sharing personal data.</p>
            <p>Our suite includes an IP checker, a real-time speed test, DNS lookup, ping latency analysis, a QR code generator and a secure password generator. Every tool runs in your browser and returns instant, accurate results.</p>
            <h2 className="text-xl font-semibold text-foreground">Our mission</h2>
            <p>Empower internet users in Morocco with transparent, privacy-respecting tools that just work — on any device, on any network, for free.</p>
            <h2 className="text-xl font-semibold text-foreground">Privacy</h2>
            <p>We do not store IP queries, lookups or test results. No accounts, no tracking pixels, no ads disguised as tools.</p>
          </div>
        </Reveal>
      </Section>
    </Layout>
  );
}
