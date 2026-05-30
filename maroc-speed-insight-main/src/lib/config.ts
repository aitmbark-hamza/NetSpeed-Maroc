/**
 * Site configuration
 * Update these values for your production environment
 */

export const SITE_NAME = "NetSpeed Maroc";
export const SITE_DOMAIN = "netspeedmaroc.com"; // Change to your domain
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION =
  "Free internet tools for Morocco: check your IP, run a speed test, inspect DNS, ping, generate QR codes and strong passwords.";

export const AUTHOR_NAME = "NetSpeed Maroc";
export const AUTHOR_EMAIL = "support@netspeedmaroc.com";
export const TWITTER_HANDLE = "@NetSpeedMaroc";
export const TWITTER_ID = "NetSpeedMaroc";

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/NetSpeedMaroc",
  linkedin: "https://linkedin.com/company/netspeedmaroc",
  github: "https://github.com/netspeedmaroc",
};

// Organization schema
export const ORGANIZATION = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+212-XXX-XXXXXX",
    contactType: "Customer Support",
    email: AUTHOR_EMAIL,
    areaServed: "MA",
    availableLanguageId: ["en", "ar", "fr"],
  },
  sameAs: [
    SOCIAL_LINKS.twitter,
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.github,
  ],
};

// Localization
export const LANGUAGE = "en";
export const LOCALE = "en_US";
export const ALTERNATE_LOCALES = ["ar_MA", "fr_MA"];

// SEO
export const KEYWORDS = [
  "IP address",
  "speed test",
  "DNS lookup",
  "ping test",
  "network tools",
  "Morocco internet",
  "ISP checker",
];
