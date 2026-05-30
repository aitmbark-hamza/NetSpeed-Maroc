import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { generateMetadata, generateSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/disclaimer")({
  head: () => {
    const { meta, links } = generateMetadata({
      title: "Disclaimer | NetSpeed Maroc",
      description:
        "Legal disclaimer and usage terms for NetSpeed Maroc internet tools and services.",
      canonical: `${SITE_URL}/disclaimer`,
    });

    return {
      meta,
      links,
    };
  },
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <Layout>
      <Section className="py-16">
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Disclaimer</h1>
              <p className="text-lg text-muted-foreground">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <article className="prose prose-sm max-w-none dark:prose-invert space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. No Warranties</h2>
                <p className="text-muted-foreground">
                  NetSpeed Maroc provides its internet tools and services on an "as-is" and
                  "as-available" basis. We make no warranties, expressed or implied, regarding
                  the accuracy, reliability, or completeness of the information or tools
                  provided on our website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. Accuracy of Information</h2>
                <p className="text-muted-foreground">
                  While we strive to provide accurate information about internet speeds, IP
                  addresses, DNS lookups, and network diagnostics, we cannot guarantee the
                  absolute accuracy of all results. Network conditions vary based on numerous
                  factors beyond our control.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  In no event shall NetSpeed Maroc be liable for any indirect, incidental,
                  special, consequential, or punitive damages arising from your use of our
                  tools and services, including but not limited to loss of revenue, lost
                  profits, or loss of data.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. Third-Party Services</h2>
                <p className="text-muted-foreground">
                  Our website may link to or utilize third-party services, APIs, and data
                  sources. We are not responsible for the accuracy, availability, or content
                  of these third-party resources.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. No Professional Advice</h2>
                <p className="text-muted-foreground">
                  The information provided on NetSpeed Maroc is for informational purposes only
                  and should not be considered professional technical or legal advice. For
                  specific technical issues, please consult with a qualified professional.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. Changes to Content</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify or discontinue our tools and services at any
                  time without notice. We are not liable for any changes or interruptions to
                  the services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. User Responsibility</h2>
                <p className="text-muted-foreground">
                  You are responsible for your use of NetSpeed Maroc's tools and services.
                  You agree not to use our services for illegal activities, harassment, or
                  unauthorized access to computer systems.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this disclaimer, please contact us through our{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    contact page
                  </a>
                  .
                </p>
              </section>
            </article>
          </div>
        </Reveal>
      </Section>
    </Layout>
  );
}
