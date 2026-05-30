import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/password-generator")({
  head: () => ({
    meta: [
      { title: "Password Generator — Strong Secure Passwords | NetSpeed Maroc" },
      { name: "description", content: "Generate strong, random and secure passwords with custom length and character sets. Free and private." },
      { property: "og:title", content: "Password Generator — NetSpeed Maroc" },
      { property: "og:description", content: "Create strong and secure passwords." },
      { property: "og:url", content: "/password-generator" },
    ],
    links: [{ rel: "canonical", href: "/password-generator" }],
  }),
  component: PasswordGenerator,
});

function generate(len: number, opts: { upper: boolean; lower: boolean; digits: boolean; symbols: boolean }) {
  let chars = "";
  if (opts.lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (opts.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (opts.digits) chars += "0123456789";
  if (opts.symbols) chars += "!@#$%^&*()-_=+[]{};:,.<>?";
  if (!chars) return "";
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => chars[n % chars.length]).join("");
}

function PasswordGenerator() {
  const [len, setLen] = useState(20);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [pwd, setPwd] = useState("");
  const [copied, setCopied] = useState(false);

  const refresh = () => setPwd(generate(len, opts));
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [len, opts]);

  const copy = () => {
    navigator.clipboard.writeText(pwd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const strength = Math.min(100, len * 4 + Object.values(opts).filter(Boolean).length * 5);

  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Password Generator</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Generate cryptographically strong passwords. Everything happens in your browser.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background p-4">
              <div className="min-w-0 flex-1 truncate font-mono text-lg">{pwd}</div>
              <Button variant="outline" size="icon" onClick={refresh}><RefreshCw className="h-4 w-4" /></Button>
              <Button onClick={copy} className="gap-2">{copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}</Button>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-background">
              <div className="h-full bg-primary transition-all" style={{ width: `${strength}%` }} />
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <Label>Length</Label>
                  <span className="text-sm font-medium">{len}</span>
                </div>
                <Slider min={6} max={64} step={1} value={[len]} onValueChange={(v) => setLen(v[0])} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {([
                  ["upper", "Uppercase (A-Z)"],
                  ["lower", "Lowercase (a-z)"],
                  ["digits", "Numbers (0-9)"],
                  ["symbols", "Symbols (!@#$)"],
                ] as const).map(([k, label]) => (
                  <label key={k} className="flex items-center justify-between rounded-xl border border-border bg-background p-3">
                    <span className="text-sm">{label}</span>
                    <Switch checked={opts[k]} onCheckedChange={(c) => setOpts((o) => ({ ...o, [k]: c }))} />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <article className="prose prose-invert mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">What makes a strong password?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Length beats complexity. A 20-character password mixing uppercase, lowercase, numbers and symbols would take centuries to crack with modern hardware. Anything under 12 characters can be brute-forced in days. Use a password manager so you never have to remember more than one strong master password.
            </p>
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">Are these passwords safe?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Yes. Passwords are generated using the browser's cryptographically secure random number generator (<code className="rounded bg-card px-1.5 py-0.5 text-foreground">crypto.getRandomValues</code>) and never leave your device. We have no way to log or recover them.
            </p>
          </article>
        </Reveal>
      </Section>
    </Layout>
  );
}

