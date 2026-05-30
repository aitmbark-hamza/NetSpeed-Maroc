import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Send, MapPin } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NetSpeed Maroc" },
      { name: "description", content: "Get in touch with the NetSpeed Maroc team. Questions, partnerships and feedback welcome." },
      { property: "og:title", content: "Contact NetSpeed Maroc" },
      { property: "og:description", content: "Get in touch with our team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Questions, feedback or partnership ideas? We'd love to hear from you.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <Mail className="h-5 w-5 text-accent" />
                <div className="mt-3 text-sm text-muted-foreground">Email</div>
                <a href="mailto:hello@netspeedmaroc.ma" className="font-medium hover:text-primary">hello@netspeedmaroc.ma</a>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <MapPin className="h-5 w-5 text-accent" />
                <div className="mt-3 text-sm text-muted-foreground">Location</div>
                <div className="font-medium">Casablanca, Morocco</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Name</Label><Input required className="mt-1.5" placeholder="Your name" /></div>
                <div><Label>Email</Label><Input required type="email" className="mt-1.5" placeholder="you@example.com" /></div>
              </div>
              <div className="mt-4"><Label>Subject</Label><Input className="mt-1.5" placeholder="How can we help?" /></div>
              <div className="mt-4"><Label>Message</Label><Textarea required className="mt-1.5 min-h-32" placeholder="Tell us more…" /></div>
              <Button type="submit" className="mt-6 gap-2"><Send className="h-4 w-4" /> Send message</Button>
              {sent && <p className="mt-4 text-sm text-accent">Thanks! We'll get back to you shortly.</p>}
            </form>
          </Reveal>
        </div>
      </Section>
    </Layout>
  );
}
