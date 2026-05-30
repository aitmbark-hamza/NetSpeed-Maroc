import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Gauge, ShieldCheck, Zap, Cpu, Sparkles, MapPin, MousePointerClick, BarChart3, Lock, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { TOOLS, POSTS, FAQS } from "@/lib/tools";
import { fetchIpInfo, type IpInfo } from "@/lib/ip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NetSpeed Maroc — Free IP Checker, Speed Test & Internet Tools" },
      { name: "description", content: "Check your public IP, ISP and location, run a free internet speed test, inspect DNS records and more. Fast, private, no signup — built for Morocco." },
      { name: "keywords", content: "what is my ip, ip address, speed test, internet speed, dns lookup, ping test, morocco internet tools" },
      { property: "og:title", content: "NetSpeed Maroc — Free Internet Tools" },
      { property: "og:description", content: "Free IP checker, speed test, DNS lookup and more. No signup, runs in your browser." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "NetSpeed Maroc",
          url: "/",
          potentialAction: {
            "@type": "SearchAction",
            target: "/blog?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function useIpInfo() {
  const [data, setData] = useState<IpInfo | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetchIpInfo()
      .then((d) => { if (!cancelled) setData(d.ip ? d : { ip: "Unavailable" }); })
      .catch(() => { if (!cancelled) setData({ ip: "Unavailable" }); });
    return () => { cancelled = true; };
  }, []);
  return data;
}

function Home() {
  const info = useIpInfo();

  return (
    <Layout>
      {/* Hero */}
      <div className="hero-bg">
      <Section className="pb-12 pt-20 sm:pt-24">

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Free forever · No signup · 100% private
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Test your internet <span className="text-primary">in one click.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Free IP checker, speed test and network tools built for Morocco. Instantly see your public IP, ISP, location, download speed and latency — straight from your browser.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/ip-checker"><Button size="lg" className="gap-2">Check My IP <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/speed-test"><Button size="lg" variant="outline">Start Speed Test</Button></Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> No tracking</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> No signup</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Lightning fast</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <LiveIpWidget info={info} />
          </Reveal>
        </div>
      </Section>
      </div>

      {/* Stats */}
      <Section className="py-10">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-4">
          {[
            { v: "10K+", l: "Tests Completed" },
            { v: "99.9%", l: "Uptime" },
            { v: "6", l: "Professional Tools" },
            { v: "300+", l: "Servers Tested" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl font-bold text-foreground">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Tools */}
      <Section>
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Every network tool you need</h2>
            <p className="mt-3 text-muted-foreground">Professional-grade utilities to inspect, test and secure your connection — all running locally in your browser, with zero install.</p>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <Reveal key={t.to} delay={i * 0.05}>
              <Link to={t.to} className="group block h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                >
                  {t.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {t.badge}
                    </span>
                  )}
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">Three steps. No install, no account, no waiting.</p>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: MousePointerClick, t: "1. Pick a tool", d: "Choose IP checker, speed test, DNS lookup or any other utility from the catalog." },
            { icon: Zap, t: "2. Run it instantly", d: "Tests execute live in your browser using trusted endpoints like Cloudflare and Google DNS." },
            { icon: BarChart3, t: "3. Read clear results", d: "Get clean, readable metrics you can share, copy or take action on right away." },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section>
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for speed and privacy</h2>
            <p className="mt-3 text-muted-foreground">No accounts. No tracking pixels. No nonsense. Just fast, reliable network tools you can trust.</p>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Zap, t: "Instant results", d: "Tools run in your browser and return measurements in milliseconds, not minutes." },
            { icon: Lock, t: "Privacy-first", d: "We never store your IP, queries, or personal information on any server." },
            { icon: Cpu, t: "Accurate data", d: "Powered by trusted infrastructure: Cloudflare, IPify, IPAPI and Google DNS." },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <f.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Blog preview */}
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
          {POSTS.map((p, i) => (
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

      {/* FAQ */}
      <Section>
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-3 text-muted-foreground">Everything you might want to know before running your first test.</p>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-sm font-semibold text-foreground">
                  {f.q}
                  <span className="mt-0.5 text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
            <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "radial-gradient(600px circle at 50% 0%, oklch(0.55 0.21 262 / 0.25), transparent 60%)" }} />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to test your connection?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Run a free speed test or check your IP details in seconds. No signup required.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/speed-test"><Button size="lg">Start Speed Test</Button></Link>
              <Link to="/ip-checker"><Button size="lg" variant="outline">Check My IP</Button></Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </Layout>
  );
}

function LiveIpWidget({ info }: { info: IpInfo | null }) {
  const flag = info?.country_code
    ? String.fromCodePoint(...info.country_code.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0)))
    : "🌐";
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-primary/5 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Live · Your connection</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-accent">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> Online
        </span>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-2xl">{flag}</div>
        <div className="min-w-0">
          <div className="truncate font-mono text-2xl font-semibold text-foreground sm:text-3xl">{info?.ip ?? "·····"}</div>
          <div className="truncate text-sm text-muted-foreground">{info?.org ?? "Detecting ISP…"}</div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Stat icon={MapPin} label="Location" value={info ? `${info.city ?? "—"}, ${info.country_name ?? ""}` : "…"} />
        <Stat icon={Globe} label="Country" value={info?.country_name ?? "…"} />
        <Stat icon={ShieldCheck} label="VPN" value="Not detected" />
        <Stat icon={Gauge} label="Type" value="IPv4" />
      </div>
      <Link to="/ip-checker" className="mt-6 block">
        <Button className="w-full">View full IP details</Button>
      </Link>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Globe; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 truncate text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
