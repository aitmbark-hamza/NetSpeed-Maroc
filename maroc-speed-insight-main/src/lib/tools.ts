import { Globe, Gauge, Search, Activity, QrCode, KeyRound } from "lucide-react";
import { BLOG_ARTICLES, type Post } from "./blog-articles";

export const TOOLS = [
  {
    to: "/ip-checker" as const,
    title: "IP Checker",
    description: "Reveal your public IP, ISP, ASN, city and country in under a second.",
    icon: Globe,
    badge: "Most popular",
  },
  {
    to: "/speed-test" as const,
    title: "Speed Test",
    description: "Measure real-world download, upload and latency over Cloudflare's global edge.",
    icon: Gauge,
  },
  {
    to: "/dns-lookup" as const,
    title: "DNS Lookup",
    description: "Resolve A, AAAA, MX, TXT, NS and CNAME records for any domain.",
    icon: Search,
  },
  {
    to: "/ping-test" as const,
    title: "Ping Test",
    description: "Sample latency to measure jitter and connection stability for gaming and calls.",
    icon: Activity,
  },
  {
    to: "/qr-generator" as const,
    title: "QR Generator",
    description: "Create high-resolution QR codes for links, WiFi and contact details.",
    icon: QrCode,
  },
  {
    to: "/password-generator" as const,
    title: "Password Generator",
    description: "Generate cryptographically strong passwords with full entropy control.",
    icon: KeyRound,
  },
];

export const PRIORITY_TOOLS = TOOLS.slice(0, 3);

export type { Post };

export const POSTS: Post[] = BLOG_ARTICLES;

export const FAQS = [
  {
    q: "Is NetSpeed Maroc really free?",
    a: "Yes. Every tool — IP checker, speed test, DNS lookup, ping, QR and password generator — is 100% free with no signup, no limits and no hidden paywall.",
  },
  {
    q: "Do you store my IP address or test results?",
    a: "No. All tools run directly in your browser. We do not log your IP, your queries, or your test results on our servers.",
  },
  {
    q: "How accurate is the speed test?",
    a: "Our speed test uses Cloudflare's global edge network to measure real-world download, upload and latency. Results are typically within 5% of dedicated desktop tools like Ookla.",
  },
  {
    q: "Why is my IP address different from what my router shows?",
    a: "Your router shows your private (local) IP. NetSpeed Maroc shows your public IP — the address the internet sees, assigned by your ISP.",
  },
  {
    q: "Does the IP checker detect VPNs?",
    a: "We surface the ISP and ASN of your connection. If you are on a known VPN provider, that will usually appear in the organization field.",
  },
  {
    q: "Can I use these tools on mobile?",
    a: "Absolutely. The entire platform is fully responsive and optimized for mobile browsers on both Android and iOS.",
  },
];
