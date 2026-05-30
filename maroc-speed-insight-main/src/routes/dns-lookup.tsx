import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/dns-lookup")({
  head: () => ({
    meta: [
      { title: "DNS Lookup — Inspect DNS Records | NetSpeed Maroc" },
      { name: "description", content: "Free DNS lookup tool. Inspect A, AAAA, MX, TXT, NS and CNAME records for any domain instantly." },
      { property: "og:title", content: "DNS Lookup — NetSpeed Maroc" },
      { property: "og:description", content: "Inspect DNS records and domain information." },
      { property: "og:url", content: "/dns-lookup" },
    ],
    links: [{ rel: "canonical", href: "/dns-lookup" }],
  }),
  component: DnsLookup,
});

const TYPES = ["A", "AAAA", "MX", "TXT", "NS", "CNAME"];

function DnsLookup() {
  const [domain, setDomain] = useState("google.com");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, string[]>>({});

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const out: Record<string, string[]> = {};
    await Promise.all(TYPES.map(async (t) => {
      try {
        const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${t}`);
        const j = await r.json();
        out[t] = (j.Answer ?? []).map((a: { data: string }) => a.data);
      } catch { out[t] = []; }
    }));
    setResults(out);
    setLoading(false);
  }

  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">DNS Lookup</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Inspect DNS records for any domain — A, AAAA, MX, TXT, NS and CNAME.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={lookup} className="mt-10 flex gap-3 rounded-2xl border border-border bg-card p-3">
            <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0" />
            <Button type="submit" disabled={loading} className="gap-2"><Search className="h-4 w-4" /> {loading ? "Looking up…" : "Lookup"}</Button>
          </form>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {TYPES.map((t, i) => (
            <Reveal key={t} delay={i * 0.04}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">{t} Records</div>
                <div className="mt-3 space-y-1 font-mono text-sm text-foreground">
                  {results[t]?.length ? results[t].map((r, j) => <div key={j} className="truncate">{r}</div>) : <div className="text-muted-foreground">—</div>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <article className="prose prose-invert mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">What is DNS?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              The Domain Name System (DNS) translates human-readable names like <code className="rounded bg-card px-1.5 py-0.5 text-foreground">google.com</code> into machine-readable IP addresses. Every web request you make starts with a silent DNS lookup, so DNS records directly shape the speed and reliability of your browsing experience.
            </p>
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">When to use this tool</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Inspect A and AAAA records to verify a site's IP, MX to debug email deliverability, TXT for SPF / DKIM / domain verification, and NS to confirm which DNS provider is authoritative. Queries run against Google's public DoH resolver (8.8.8.8).
            </p>
          </article>
        </Reveal>
      </Section>
    </Layout>
  );
}

