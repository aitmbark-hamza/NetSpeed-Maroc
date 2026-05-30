import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — NetSpeed Maroc" },
      { name: "description", content: "How NetSpeed Maroc handles your data: what we collect, what we don't, and your rights." },
      { property: "og:title", content: "Privacy Policy — NetSpeed Maroc" },
      { property: "og:description", content: "Our privacy policy in plain language." },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="prose prose-invert mt-8 max-w-3xl space-y-5 text-muted-foreground">
            <p>NetSpeed Maroc ("we", "us") respects your privacy. This policy explains what limited data we process when you use our tools.</p>
            <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
            <p>Our tools run primarily in your browser. When you use the IP checker, public APIs (IPify, IPAPI) receive your IP address to return information about your connection. We do not store this data on our servers.</p>
            <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
            <p>We use minimal local storage to remember your theme preference. We may use third-party advertising cookies (Google AdSense) which are governed by their own policies.</p>
            <h2 className="text-xl font-semibold text-foreground">Third-party services</h2>
            <p>We may display ads via Google AdSense. Google may use cookies to serve ads based on prior visits. You can opt out via Google Ad Settings.</p>
            <h2 className="text-xl font-semibold text-foreground">Your rights</h2>
            <p>You can clear local storage at any time from your browser settings. Contact us at hello@netspeedmaroc.ma for any privacy-related question.</p>
          </div>
        </Reveal>
      </Section>
    </Layout>
  );
}
