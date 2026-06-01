import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — NetSpeed Maroc" },
      { name: "description", content: "The terms that govern your use of NetSpeed Maroc tools and services." },
      { property: "og:title", content: "Terms of Service — NetSpeed Maroc" },
      { property: "og:description", content: "Terms of service for NetSpeed Maroc." },
      { property: "og:url", content: `${SITE_URL}/terms-of-service` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms-of-service` }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="prose prose-invert mt-8 max-w-3xl space-y-5 text-muted-foreground">
            <p>By accessing NetSpeed Maroc you agree to these terms. If you do not agree, please do not use the service.</p>
            <h2 className="text-xl font-semibold text-foreground">Use of service</h2>
            <p>Our tools are provided "as is" for personal and informational use. You agree not to misuse the platform, attempt to disrupt it, or use it for any unlawful purpose.</p>
            <h2 className="text-xl font-semibold text-foreground">Accuracy</h2>
            <p>While we strive for accuracy, results from third-party APIs (IP geolocation, speed endpoints, DNS providers) may vary. We make no warranty regarding precision.</p>
            <h2 className="text-xl font-semibold text-foreground">Limitation of liability</h2>
            <p>To the maximum extent permitted by law, NetSpeed Maroc is not liable for any indirect or consequential damages arising from use of the service.</p>
            <h2 className="text-xl font-semibold text-foreground">Changes</h2>
            <p>We may update these terms from time to time. Continued use after changes constitutes acceptance of the new terms.</p>
          </div>
        </Reveal>
      </Section>
    </Layout>
  );
}
