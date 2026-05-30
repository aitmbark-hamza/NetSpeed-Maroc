/**
 * SEO Utilities for metadata and schema generation
 */

import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, AUTHOR_NAME, TWITTER_ID, ORGANIZATION } from "./config";

/**
 * Generate metadata for a page
 */
export function generateMetadata(options: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  author?: string;
  canonical?: string;
  type?: "website" | "article" | "blog";
  publicationDate?: string;
  modifiedDate?: string;
}) {
  const {
    title,
    description,
    keywords,
    image = `${SITE_URL}/og-image.png`,
    author = AUTHOR_NAME,
    canonical = typeof window !== "undefined" ? window.location.href : `${SITE_URL}/`,
    type = "website",
    publicationDate,
    modifiedDate,
  } = options;

  const meta = [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
    { title },
    { name: "description", content: description },
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    { name: "author", content: author },
    { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: `@${TWITTER_ID}` },
    { name: "twitter:creator", content: `@${TWITTER_ID}` },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },

    // Mobile
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: SITE_NAME },

    // Article specific
    ...(type === "article" && publicationDate
      ? [
          { property: "article:published_time", content: publicationDate },
          { property: "article:author", content: author },
        ]
      : []),
    ...(modifiedDate ? [{ property: "article:modified_time", content: modifiedDate }] : []),
  ];

  const links = [
    { rel: "canonical", href: canonical },
    { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/` },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ];

  return { meta, links };
}

/**
 * Generate schema.org JSON-LD structured data
 */
export function generateSchema(type: "Organization" | "WebSite" | "Article" | "BreadcrumbList" | "FAQPage", data?: Record<string, unknown>) {
  const baseSchemas: Record<string, object> = {
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      ...ORGANIZATION,
    },
    WebSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    BreadcrumbList: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data?.itemListElement || [],
    },
    FAQPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data?.mainEntity || [],
    },
    Article: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      author: {
        "@type": "Organization",
        name: AUTHOR_NAME,
        url: SITE_URL,
      },
      publisher: ORGANIZATION,
      ...data,
    },
  };

  return baseSchemas[type] || baseSchemas.WebSite;
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate article schema
 */
export function generateArticleSchema(options: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  content: string;
  url: string;
  category?: string;
}) {
  const {
    title,
    description,
    author,
    publishedDate,
    modifiedDate,
    image,
    content,
    url,
    category,
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image || `${SITE_URL}/og-image.png`,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      "@type": "Person",
      name: author,
      url: SITE_URL,
    },
    publisher: ORGANIZATION,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(category && { articleSection: category }),
  };
}

/**
 * Generate local business schema
 */
export function generateLocalBusinessSchema(options: {
  name: string;
  address: string;
  phone: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}) {
  const { name, address, phone, city, country, latitude, longitude } = options;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      addressCountry: country,
    },
    telephone: phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
  };
}

/**
 * Generate product/service schema
 */
export function generateProductSchema(options: {
  name: string;
  description: string;
  image?: string;
  rating?: number;
  ratingCount?: number;
  price?: string;
  priceCurrency?: string;
}) {
  const {
    name,
    description,
    image,
    rating,
    ratingCount,
    price,
    priceCurrency = "USD",
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image || `${SITE_URL}/og-image.png`,
    ...(rating && ratingCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        ratingCount,
      },
    }),
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

/**
 * Encode schema for JSON-LD script tag
 */
export function encodeSchema(schema: unknown): string {
  return JSON.stringify(schema);
}
