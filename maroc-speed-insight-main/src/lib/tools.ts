import { Globe, Gauge, Search, Activity, QrCode, KeyRound } from "lucide-react";
import { BLOG_ARTICLES, type Post } from "./blog-articles";

// Exported for static routes (sitemap, blog index page)
export const POSTS: Post[] = BLOG_ARTICLES;

// Lazy load blog articles - only when needed for homepage preview
export async function loadBlogArticles() {
  return BLOG_ARTICLES;
}

export type { Post } from "./blog-articles";

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

// Keep POSTS for backwards compatibility
// Exported above for static/server-side usage

export const FAQS = [
  {
    q: "What is my IP address?",
    a: "Your IP address (Internet Protocol address) is a unique numerical label assigned to every device connected to the internet. It identifies your device on the network and enables other computers to send data to you. There are two types: public IP (visible to the internet) and private IP (for local networks). NetSpeed Maroc displays your public IP, which is assigned by your Internet Service Provider (ISP).",
  },
  {
    q: "How do I find my IP address?",
    a: "Use NetSpeed Maroc's IP Checker tool — just visit our website and your public IP is displayed instantly. On Windows, you can also open Command Prompt and type 'ipconfig'. On Mac or Linux, open Terminal and type 'ifconfig' or 'ip addr'. However, the easiest way is to use our one-click IP checker for complete information including your ISP, location, and ASN.",
  },
  {
    q: "Can websites see my IP address?",
    a: "Yes, websites can see your public IP address — this is necessary for them to send data back to your browser. However, they cannot see your private IP or personal identity just from the IP address. Your ISP can link your IP to your account, which is why VPNs are recommended if you want to hide your location and ISP information from websites.",
  },
  {
    q: "What is IPv4?",
    a: "IPv4 (Internet Protocol version 4) is the older IP addressing standard using 32-bit addresses, written as four numbers separated by dots (e.g., 192.168.1.1). It supports approximately 4.3 billion unique addresses. Most devices and networks still use IPv4, though it's gradually being replaced by IPv6 due to address exhaustion. All traditional websites and services work with IPv4.",
  },
  {
    q: "What is IPv6?",
    a: "IPv6 (Internet Protocol version 6) is the newer IP addressing standard using 128-bit addresses, written as eight groups of hexadecimal digits (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334). It supports over 340 undecillion unique addresses — enough for every device on Earth and beyond. IPv6 offers improved security, faster routing, and better performance, but adoption is still in progress. Check your IPv6 support with NetSpeed Maroc's IP Checker.",
  },
  {
    q: "Is NetSpeed Maroc really free?",
    a: "Yes. Every tool — IP checker, speed test, DNS lookup, ping, QR generator and password generator — is 100% free with no signup required, no usage limits and no hidden paywalls. We don't sell your data or display intrusive ads.",
  },
  {
    q: "Do you store my IP address or test results?",
    a: "No. All tools run directly in your browser using client-side JavaScript. We do not log your IP address, DNS queries, speed test results, or any personal information on our servers. Your privacy is protected by default.",
  },
  {
    q: "How accurate is the speed test?",
    a: "Our speed test uses Cloudflare's global edge network to measure real-world download speed, upload speed and latency. Results are typically within 5% of dedicated desktop tools like Ookla. For the most accurate results, use a wired Ethernet connection and close other applications consuming bandwidth.",
  },
  {
    q: "Why is my IP address different from what my router shows?",
    a: "Your router displays your private (local) IP address, which is only visible on your local network. NetSpeed Maroc displays your public IP address — the address the entire internet sees, assigned by your Internet Service Provider (ISP). All traffic leaving your home network uses this public IP.",
  },
  {
    q: "Does the IP checker detect VPNs?",
    a: "Our IP checker surfaces the ISP and ASN of your connection. If you are using a known VPN provider, that organization's name will typically appear in the ISP field instead of your actual ISP. This allows you to verify your VPN is working correctly.",
  },
  {
    q: "Can I use these tools on mobile?",
    a: "Absolutely. The entire NetSpeed Maroc platform is fully responsive and optimized for mobile browsers on Android, iOS and tablets. All tools work identically on mobile and desktop with full functionality.",
  },
];
