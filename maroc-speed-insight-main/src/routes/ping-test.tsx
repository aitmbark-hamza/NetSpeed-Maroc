import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, Play } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/ping-test")({
  head: () => ({
    meta: [
      { title: "Ping Test — Latency & Response Time | NetSpeed Maroc" },
      { name: "description", content: "Test your network latency to any host. Free, fast and accurate ping test running in your browser." },
      { property: "og:title", content: "Ping Test — NetSpeed Maroc" },
      { property: "og:description", content: "Analyze latency and network response time." },
      { property: "og:url", content: "/ping-test" },
    ],
    links: [{ rel: "canonical", href: "/ping-test" }],
  }),
  component: PingTest,
});

function PingTest() {
  const [host, setHost] = useState("https://www.cloudflare.com");
  const [running, setRunning] = useState(false);
  const [samples, setSamples] = useState<number[]>([]);

  async function run() {
    setRunning(true); setSamples([]);
    const out: number[] = [];
    for (let i = 0; i < 8; i++) {
      const start = performance.now();
      try { await fetch(host + "/cdn-cgi/trace?_=" + Math.random(), { cache: "no-store", mode: "no-cors" }); } catch {}
      out.push(Math.round(performance.now() - start));
      setSamples([...out]);
      await new Promise((r) => setTimeout(r, 150));
    }
    setRunning(false);
  }

  const avg = samples.length ? Math.round(samples.reduce((a, b) => a + b, 0) / samples.length) : null;
  const min = samples.length ? Math.min(...samples) : null;
  const max = samples.length ? Math.max(...samples) : null;

  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Ping Test</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Measure round-trip latency to any host from your browser.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3 rounded-2xl border border-border bg-card p-3">
            <Input value={host} onChange={(e) => setHost(e.target.value)} className="min-w-0 flex-1 border-0 bg-transparent focus-visible:ring-0" />
            <Button onClick={run} disabled={running} className="gap-2"><Play className="h-4 w-4" /> {running ? "Pinging…" : "Start"}</Button>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { l: "Average", v: avg },
            { l: "Minimum", v: min },
            { l: "Maximum", v: max },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Activity className="h-4 w-4 text-accent" /> {s.l}</div>
              <div className="mt-3 text-4xl font-bold">{s.v ?? "—"} <span className="text-base font-normal text-muted-foreground">ms</span></div>
            </div>
          ))}
        </div>

        {samples.length > 0 && (
          <Reveal>
            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Samples</div>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-sm">
                {samples.map((s, i) => <span key={i} className="rounded-md bg-background px-2 py-1">{s} ms</span>)}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal>
          <article className="prose prose-invert mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">What is ping?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Ping is the round-trip time between your device and a remote server, measured in milliseconds. Low ping (under 60 ms) is essential for online gaming, video calls and live trading. High ping causes lag even on otherwise fast connections.
            </p>
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">How to lower your ping</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Use a wired Ethernet connection where possible, close background apps that consume bandwidth, prefer game servers geographically close to Morocco (Europe usually wins), and restart your router weekly to clear accumulated state.
            </p>
          </article>
        </Reveal>
      </Section>
    </Layout>
  );
}

