import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";
import { Layout, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/qr-generator")({
  head: () => ({
    meta: [
      { title: "QR Code Generator — Free Instant QR Codes | NetSpeed Maroc" },
      { name: "description", content: "Generate QR codes instantly from any URL or text. Download as PNG, free and unlimited." },
      { property: "og:title", content: "QR Generator — NetSpeed Maroc" },
      { property: "og:description", content: "Generate QR codes instantly for links and text." },
      { property: "og:url", content: `${SITE_URL}/qr-generator` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/qr-generator` }],
  }),
  component: QrGenerator,
});

function QrGenerator() {
  const [text, setText] = useState("https://netspeedmaroc.ma");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!text) return setUrl("");
    QRCode.toDataURL(text, { width: 512, margin: 2, color: { dark: "#0F172A", light: "#FFFFFF" } })
      .then(setUrl).catch(() => setUrl(""));
  }, [text]);

  return (
    <Layout>
      <Section className="pt-16">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">QR Code Generator</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Turn any link or text into a scannable QR code in seconds.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6">
              <label className="text-sm font-medium">Content</label>
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com or any text" className="mt-2" />
              <p className="mt-3 text-xs text-muted-foreground">QR code updates automatically as you type.</p>
              {url && (
                <a href={url} download="qrcode.png">
                  <Button className="mt-6 w-full gap-2"><Download className="h-4 w-4" /> Download PNG</Button>
                </a>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid place-items-center rounded-2xl border border-border bg-card p-6">
              {url ? <img src={url} alt="Generated QR code" className="h-72 w-72 rounded-xl" /> : <div className="text-muted-foreground">Enter content to generate</div>}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <article className="prose prose-invert mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">What can you do with a QR code?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              QR codes turn any text or URL into a scannable image. Print one on a menu to share a digital version, on a poster to drive traffic to a landing page, or on a business card to instantly share your contact. Codes generated here are 512×512 PNG, high-contrast, and tested to scan reliably from a phone camera.
            </p>
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">Privacy</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Generation happens entirely in your browser. Your content never reaches our servers — perfect for sensitive links like WiFi passwords or internal URLs.
            </p>
          </article>
        </Reveal>
      </Section>
    </Layout>
  );
}

