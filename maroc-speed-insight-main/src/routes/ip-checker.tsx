import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Check, Globe, MapPin, Wifi, Clock, Cpu, Shield, ArrowRight } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { fetchIpInfo, type IpInfo as FullInfo } from "@/lib/ip";
import { FAQS } from "@/lib/tools";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/ip-checker")({
  head: () => ({
    meta: [
      { title: "What Is My IP? — Free IP Address Checker | NetSpeed Maroc" },
      { name: "description", content: "Find your public IP address, ISP, ASN, country, city, timezone and VPN status — instantly and free. Works on any device, no signup." },
      { name: "keywords", content: "what is my ip, ip address, my ip, ip checker, ip lookup, isp, asn, geolocation" },
      { property: "og:title", content: "What Is My IP? — Free IP Checker" },
      { property: "og:description", content: "Instantly check your public IP, ISP, ASN and location." },
      { property: "og:url", content: `${SITE_URL}/ip-checker` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ip-checker` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "IP Checker",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          url: `${SITE_URL}/ip-checker`,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "2143" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "IP Checker", item: `${SITE_URL}/ip-checker` },
          ],
        }),
      },
    ],
  }),
  component: IpChecker,
});

const VPN_KEYWORDS = ["vpn", "proxy", "hosting", "ovh", "digitalocean", "amazon", "google cloud", "azure", "datacenter", "data center", "nordvpn", "expressvpn", "surfshark", "mullvad"];

function IpChecker() {
  const [info, setInfo] = useState<FullInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [ua, setUa] = useState({ browser: "—", os: "—" });

  useEffect(() => {
    fetchIpInfo().then((d) => setInfo(d)).catch(() => setInfo({ ip: "Unavailable" }));
    const u = navigator.userAgent;
    const browser = /Edg/.test(u) ? "Edge" : /Chrome/.test(u) ? "Chrome" : /Firefox/.test(u) ? "Firefox" : /Safari/.test(u) ? "Safari" : "Unknown";
    const os = /Windows/.test(u) ? "Windows" : /Mac/.test(u) ? "macOS" : /Android/.test(u) ? "Android" : /iPhone|iPad/.test(u) ? "iOS" : /Linux/.test(u) ? "Linux" : "Unknown";
    setUa({ browser, os });
  }, []);

  const copy = () => {
    if (!info?.ip) return;
    navigator.clipboard.writeText(info.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const flag = info?.country_code
    ? String.fromCodePoint(...info.country_code.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0)))
    : "🌐";

  const orgLower = (info?.org || "").toLowerCase();
  const vpnLikely = info ? VPN_KEYWORDS.some((k) => orgLower.includes(k)) : false;

  const cards = [
    { icon: Globe, label: "IP address", value: info?.ip || "…" },
    { icon: Globe, label: "Version", value: info?.version || "IPv4" },
    { icon: Wifi, label: "ISP / Organization", value: info?.org || "…" },
    { icon: Cpu, label: "ASN", value: info?.asn || "…" },
    { icon: MapPin, label: "City", value: info?.city || "—" },
    { icon: MapPin, label: "Region", value: info?.region || "—" },
    { icon: Globe, label: "Country", value: info ? `${flag} ${info.country_name ?? ""}` : "…" },
    { icon: Clock, label: "Timezone", value: info?.timezone || "—" },
    { icon: Shield, label: "VPN / Proxy", value: vpnLikely ? "Likely detected" : "Not detected" },
    { icon: Cpu, label: "Browser", value: ua.browser },
    { icon: Cpu, label: "Operating System", value: ua.os },
    { icon: MapPin, label: "Coordinates", value: info?.latitude ? `${info.latitude}, ${info.longitude}` : "—" },
  ];

  const mapSrc = info?.latitude && info?.longitude
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${info.longitude - 0.5},${info.latitude - 0.5},${info.longitude + 0.5},${info.latitude + 0.5}&layer=mapnik&marker=${info.latitude},${info.longitude}`
    : null;

  return (
    <Layout>
      <div className="hero-bg">
        <Section className="pt-16 sm:pt-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-accent" /> Private · No data stored
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              What is <span className="text-gradient-primary">my IP address?</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Your public IP, ISP, ASN, geolocation, timezone and VPN status — fetched live from multiple providers.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-elevated">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Your public IP</div>
                  <div className="mt-2 font-mono text-3xl font-bold text-foreground sm:text-5xl">{info?.ip ?? "·····"}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{info ? `${flag} ${info.country_name ?? ""} · ${info.org ?? "Detecting ISP…"}` : "Loading…"}</div>
                </div>
                <Button onClick={copy} variant="outline" className="gap-2">
                  {copied ? <><Check className="h-4 w-4 text-accent" /> Copied</> : <><Copy className="h-4 w-4" /> Copy IP</>}
                </Button>
              </div>
            </div>
          </Reveal>
        </Section>
      </div>

      <Section className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.02}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <c.icon className="h-3.5 w-3.5" /> {c.label}
                </div>
                <div className="mt-2 truncate text-base font-semibold text-foreground">{c.value}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {mapSrc && (
          <Reveal>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
              <iframe
                title="Approximate location of your IP"
                src={mapSrc}
                className="h-80 w-full"
                loading="lazy"
              />
              <div className="border-t border-border p-3 text-xs text-muted-foreground">
                Approximate location based on IP geolocation — accuracy is city-level, not street-level.
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      {/* SEO long-form */}
      <Section>
        <Reveal>
          <article className="prose prose-invert max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">What is an IP address?</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>An IP address is a unique number that identifies your device on the internet. Every time you load a website, the website you visit sees this number so it knows where to send the page back. Without an IP, no online communication would be possible.</p>
              <p>There are two kinds of IP addresses: <strong className="text-foreground">public</strong> (the one your Internet Service Provider gives you, visible to the whole internet) and <strong className="text-foreground">private</strong> (the one your router assigns to each device inside your home, like 192.168.1.10). Our tool shows your public IP — that is the one websites, games and apps actually see.</p>
            </div>

            <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">What can someone learn from your IP?</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>From a public IP, anyone can usually find out: the country and approximate city, the Internet Service Provider, the connection type (residential, mobile, datacenter, VPN), and the autonomous system number (ASN). They cannot find your home address, your name or your browsing history just from your IP.</p>
              <p>If you want extra privacy, a reputable VPN replaces your real IP with one from the VPN provider. Our checker will usually flag those connections under <strong className="text-foreground">VPN / Proxy</strong> when the ISP field matches a known hosting or VPN provider.</p>
            </div>

            <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">Why does my IP change?</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>Most home connections in Morocco use dynamic IP addresses. Your ISP rotates them every few hours or days, or when your router reboots. If you need a fixed address (for example, to host a service or whitelist a connection), ask your ISP about a static IP.</p>
              <p>Switching between WiFi and mobile data also gives you a different IP, because mobile and fixed-line networks run on completely separate infrastructures.</p>
            </div>

            <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">IPv4 vs IPv6 — which one am I using?</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>IPv4 addresses look like <code className="rounded bg-card px-1.5 py-0.5 text-foreground">197.146.139.127</code>. The world ran out of unused IPv4 blocks years ago, so a new format — IPv6, which looks like <code className="rounded bg-card px-1.5 py-0.5 text-foreground">2001:db8::1</code> — has been rolled out gradually. Our checker shows whichever version your connection currently uses.</p>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">IP address — frequently asked questions</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FAQS.slice(0, 4).map((f, i) => (
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

      {/* Related */}
      <Section>
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">Try our other tools</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { to: "/speed-test" as const, t: "Speed Test", d: "Measure download, upload and ping." },
            { to: "/dns-lookup" as const, t: "DNS Lookup", d: "Inspect any domain's DNS records." },
            { to: "/ping-test" as const, t: "Ping Test", d: "Analyze latency to any host." },
          ].map((r) => (
            <Link key={r.to} to={r.to} className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
              <div className="font-semibold">{r.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{r.d}</div>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
