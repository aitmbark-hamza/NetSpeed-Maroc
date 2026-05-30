import { Link } from "@tanstack/react-router";
import { Gauge, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Gauge className="h-4 w-4" />
            </div>
            <span>NetSpeed <span className="text-accent">Maroc</span></span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Free internet tools built for Morocco. Check your IP, run a speed test, inspect DNS, generate QR codes — all in your browser, with no signup and no tracking.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-accent" /> Made in Morocco 🇲🇦
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Tools</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/ip-checker" className="hover:text-foreground">IP Checker</Link></li>
            <li><Link to="/speed-test" className="hover:text-foreground">Speed Test</Link></li>
            <li><Link to="/dns-lookup" className="hover:text-foreground">DNS Lookup</Link></li>
            <li><Link to="/ping-test" className="hover:text-foreground">Ping Test</Link></li>
            <li><Link to="/qr-generator" className="hover:text-foreground">QR Generator</Link></li>
            <li><Link to="/password-generator" className="hover:text-foreground">Password Generator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/blog/$slug" params={{ slug: "what-is-my-ip-address" }} className="hover:text-foreground">What is my IP?</Link></li>
            <li><Link to="/blog/$slug" params={{ slug: "how-to-improve-wifi-speed" }} className="hover:text-foreground">Improve WiFi speed</Link></li>
            <li><Link to="/blog/$slug" params={{ slug: "what-is-ping-in-gaming" }} className="hover:text-foreground">Lower your ping</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-foreground">Sitemap</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-foreground">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} NetSpeed Maroc. All rights reserved.</p>
          <a href="mailto:hello@netspeedmaroc.ma" className="hover:text-foreground">hello@netspeedmaroc.ma</a>
        </div>
      </div>
    </footer>
  );
}
