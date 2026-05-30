/**
 * AdSense Preparation & Monetization Guide
 * This file contains recommendations and implementation guidelines for AdSense approval
 */

export const ADSENSE_CHECKLIST = {
  requirements: [
    {
      category: "Content Quality",
      items: [
        "✅ 30+ high-quality blog articles (DONE)",
        "✅ Clear, original content targeting specific keywords",
        "✅ Articles structured with h2/h3 headers",
        "✅ Professional writing without grammatical errors",
        "✅ Target: 1500+ words for complex topics",
      ],
    },
    {
      category: "Technical SEO",
      items: [
        "✅ Proper heading hierarchy (one H1 per page)",
        "✅ Meta descriptions for all pages",
        "✅ Canonical URLs implemented",
        "✅ robots.txt configured",
        "✅ sitemap.xml generated",
        "✅ Mobile-responsive design",
        "✅ Fast page load times",
      ],
    },
    {
      category: "Trust & Authority Signals",
      items: [
        "✅ About page with credibility information",
        "✅ Contact page with multiple ways to reach you",
        "✅ Privacy policy page (required)",
        "✅ Terms of service page",
        "✅ Disclaimer page",
        "✅ Author information on blog posts",
        "✅ E-E-A-T signals in content",
      ],
    },
    {
      category: "User Experience",
      items: [
        "✅ Clear navigation menu",
        "✅ Internal linking between articles",
        "✅ Table of contents for long articles",
        "✅ Fast loading (< 3 seconds)",
        "✅ Easy reading (good contrast, readable fonts)",
        "✅ No intrusive popups or redirects",
        "✅ Minimal external ads until approval",
      ],
    },
    {
      category: "AdSense Policy Compliance",
      items: [
        "❌ NO adult content",
        "❌ NO copyright infringement",
        "❌ NO excessive ads before content",
        "❌ NO click bait headlines",
        "❌ NO automatic redirects",
        "❌ NO deceptive content",
        "❌ NO user data collection without consent",
      ],
    },
  ],

  adPlacementStrategy: {
    desktopLayout: `
    [Navigation]
    [Header]
    
    [Ad Unit 1 - Responsive banner - 728x90 or 970x90]
    [Above fold content]
    
    [Main Content]
    [Ad Unit 2 - In-article - 300x250 medium rectangle]
    [Continue content]
    
    [Ad Unit 3 - In-article - 300x250 medium rectangle]
    [Continue content/Related posts]
    
    [Ad Unit 4 - Below content - 728x90]
    [Footer]
    `,

    mobileLayout: `
    [Navigation]
    [Ad Unit 1 - Mobile banner - 320x50]
    [Header]
    [Content]
    [Ad Unit 2 - 300x250 in content]
    [Content continues]
    [Ad Unit 3 - 300x250 in content]
    [Related articles]
    [Ad Unit 4 - 320x50 footer]
    `,

    bestPractices: [
      "Maximum 3 ad units per page",
      "Place first ad above the fold (visible without scrolling)",
      "Ensure content remains primary focus",
      "Use responsive ad units (adapt to device)",
      "Don't place ads between header and content",
      "Separate ads from other interactive elements by spacing",
      "Test ad visibility and UX",
    ],
  },

  contentStrategy: {
    eeatSignals: [
      "Author credentials: List writing experience in bio",
      "Expert citations: Reference industry authorities",
      "Data & research: Include statistics, studies, benchmarks",
      "User testimonials: Add reader feedback where possible",
      "Topical expertise: Build deep knowledge in specific areas",
      "Authority links: Link to recognized sources",
    ],

    contentPillars: [
      "Internet Speed Testing & Optimization",
      "IP Addresses & Networking Fundamentals",
      "Network Security & Privacy",
      "Internet Providers in Morocco",
      "WiFi Optimization & Troubleshooting",
      "Online Tools Guides",
    ],

    targetKeywords: [
      "internet speed test",
      "IP address checker",
      "what is my IP",
      "ping test",
      "DNS lookup",
      "WiFi optimization",
      "internet providers Morocco",
      "fiber internet",
      "network diagnostics",
      "online security",
    ],
  },

  implementationChecklist: [
    "[ ] Add Google Analytics 4 tracking",
    "[ ] Set up Google Search Console",
    "[ ] Submit sitemap to GSC",
    "[ ] Add schema markup to blog posts",
    "[ ] Create FAQ schema for help content",
    "[ ] Set up breadcrumb navigation",
    "[ ] Add author schema to articles",
    "[ ] Implement cookie consent banner",
    "[ ] Add privacy policy terms",
    "[ ] Test on Mobile-Friendly Test",
    "[ ] Run PageSpeed Insights audit",
    "[ ] Fix Core Web Vitals issues",
    "[ ] Review for duplicate content",
    "[ ] Set preferred domain (www vs non-www)",
  ],

  adUnitCode: `
<!-- Example AdSense responsive ad unit -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
  crossorigin="anonymous"></script>
<!-- Responsive Ad Unit -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
  data-ad-slot="xxxxxxxxxx"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
`,

  submissionChecklist: [
    {
      step: 1,
      title: "Create AdSense Account",
      tasks: [
        "Go to google.com/adsense",
        "Sign in with Google account",
        "Enter website URL",
      ],
    },
    {
      step: 2,
      title: "Add AdSense Code to Website",
      tasks: [
        "Copy the ad code from AdSense",
        "Paste into HTML before closing </head> tag",
        "Wait 24 hours for processing",
      ],
    },
    {
      step: 3,
      title: "Google Review",
      tasks: [
        "Google reviews site for policy compliance",
        "Review takes 2-4 weeks",
        "Check email for approval/rejection",
      ],
    },
    {
      step: 4,
      title: "Add Ad Units (After Approval)",
      tasks: [
        "Create ad units in AdSense dashboard",
        "Choose ad formats (responsive, display, etc.)",
        "Copy ad unit codes",
        "Paste into strategic locations on site",
      ],
    },
  ],

  commonRejectionReasons: [
    "Insufficient content (usually < 10 posts)",
    "Duplicate or thin content",
    "Poor user experience (too many popups, ads)",
    "Policy violations (adult, copyright, violence)",
    "Low traffic (new sites need patience)",
    "Domain too new (< 6 months old)",
    "No clear site navigation",
    "Copyright infringement",
    "Click-baity headlines",
    "Excessive outbound links",
  ],

  preventionTips: [
    "✅ Only use original content",
    "✅ Write for humans, not search engines",
    "✅ Cite all statistics and data",
    "✅ Link to authoritative sources",
    "✅ Be transparent about who you are",
    "✅ Avoid exaggeration in headlines",
    "✅ Keep content length appropriate",
    "✅ Don't hide affiliate links",
    "✅ Use consistent branding",
    "✅ Maintain updated privacy/TOS",
  ],
};

export default ADSENSE_CHECKLIST;
