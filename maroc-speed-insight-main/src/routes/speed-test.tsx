import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Upload, Activity, Play } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/speed-test")({
  head: () => ({
    meta: [
      { title: "Speed Test — Free Internet Speed Test | NetSpeed Maroc" },
      { name: "description", content: "Measure your download speed, upload speed and ping in real time with our free browser-based speed test." },
      { property: "og:title", content: "Speed Test — NetSpeed Maroc" },
      { property: "og:description", content: "Measure download, upload and ping in real time." },
      { property: "og:url", content: "/speed-test" },
    ],
    links: [{ rel: "canonical", href: "/speed-test" }],
  }),
  component: SpeedTest,
});

function SpeedTest() {
  const [running, setRunning] = useState(false);
  const [down, setDown] = useState<number | null>(null);
  const [up, setUp] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);

  async function measurePing() {
    const samples: number[] = [];
    for (let i = 0; i < 5; i++) {
      const start = performance.now();
      try { await fetch("https://www.cloudflare.com/cdn-cgi/trace?_=" + Math.random(), { cache: "no-store" }); } catch {}
      samples.push(performance.now() - start);
    }
    samples.sort((a, b) => a - b);
    return Math.round(samples[Math.floor(samples.length / 2)]);
  }

  async function measureDownload() {
    const size = 5_000_000;
    const url = `https://speed.cloudflare.com/__down?bytes=${size}&_=${Math.random()}`;
    const start = performance.now();
    const res = await fetch(url, { cache: "no-store" });
    const buf = await res.arrayBuffer();
    const sec = (performance.now() - start) / 1000;
    const mbps = (buf.byteLength * 8) / sec / 1_000_000;
    return Math.round(mbps * 10) / 10;
  }

  async function measureUpload() {
    const size = 1_000_000;
    const blob = new Blob([new Uint8Array(size)]);
    const start = performance.now();
    try { await fetch("https://speed.cloudflare.com/__up", { method: "POST", body: blob }); } catch {}
    const sec = (performance.now() - start) / 1000;
    const mbps = (size * 8) / sec / 1_000_000;
    return Math.round(mbps * 10) / 10;
  }

  async function run() {
    setRunning(true); setDown(null); setUp(null); setPing(null);
    try {
      setPing(await measurePing());
      setDown(await measureDownload());
      setUp(await measureUpload());
    } finally { setRunning(false); }
  }

  const cards = [
    { icon: Download, label: "Download", value: down, unit: "Mbps", color: "text-primary" },
    { icon: Upload, label: "Upload", value: up, unit: "Mbps", color: "text-accent" },
    { icon: Activity, label: "Ping", value: ping, unit: "ms", color: "text-foreground" },
  ];

  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Internet Speed Test</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Measure your real-world download speed, upload speed and latency.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-border bg-card p-10 text-center">
            <Button size="lg" onClick={run} disabled={running} className="gap-2 px-10">
              <Play className="h-4 w-4" /> {running ? "Testing…" : "Start Test"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">Powered by Cloudflare speed endpoints.</p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <c.icon className={`h-4 w-4 ${c.color}`} /> {c.label}
                </div>
                <div className="mt-3 text-4xl font-bold">
                  {c.value ?? "—"} <span className="text-base font-normal text-muted-foreground">{c.unit}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <article className="prose prose-invert mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">How our speed test works</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              We download a 5 MB file from Cloudflare's global edge network and upload 1 MB back to measure your real-world throughput. Latency is measured as the median of five round-trips. Everything runs inside your browser — no extension, no installer, no account.
            </p>
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">What is a good internet speed?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              For most homes, 25 Mbps download is enough for HD streaming on two devices. 100 Mbps comfortably handles 4K streaming, video calls and gaming at the same time. Upload speed matters most for video calls and cloud backups — anything above 10 Mbps is considered good.
            </p>
          </article>
        </Reveal>
      </Section>
    </Layout>
  );
}

