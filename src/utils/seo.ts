import { JerseyBlog } from '../data/jerseys';

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: string;
  keywords: string;
}

export const SEO_CONFIGS = {
  all: {
    path: '/all-jerseys',
    title: 'Football Jersey Prices & Editions Guide | JerseyBird',
    // Character count: 149 characters (Aim: 140-160)
    // Primary keyword: "football jersey prices"
    description:
      'Compare authentic football jersey prices, player-issue cuts, replica options, and official sleeve badges for Premier League clubs and National Teams.',
    keywords: 'football jersey prices, soccer kits, authentic player issue, stadium replica, jersey options',
  },
  national: {
    path: '/national-jerseys',
    title: 'National Football Jerseys: Prices & Editions | JerseyBird',
    // Character count: 151 characters (Aim: 140-160)
    // Primary keyword: "national football jerseys"
    description:
      'Explore national football jerseys with verified prices, authentic player cuts, stadium replicas, and Euro or World Cup tournament badges on JerseyBird.',
    keywords: 'national football jerseys, national team kits, England jersey price, Argentina 3 star, Euro kits',
  },
  premierLeague: {
    path: '/premier-league-jerseys',
    title: 'Premier League Jerseys: Prices & Options | JerseyBird',
    // Character count: 150 characters (Aim: 140-160)
    // Primary keyword: "Premier League jerseys"
    description:
      'Find official Premier League jerseys with transparent pricing, authentic match editions, fan replicas, and custom sleeve patch options on JerseyBird.',
    keywords: 'Premier League jerseys, EPL kit prices, Arsenal kit price, Man City jersey, Liverpool shirt',
  },
} as const;

export function getJerseySEODescription(jersey: JerseyBlog): string {
  // Format target: 140-160 characters
  // Primary keyword: "${jersey.team} jersey prices"
  const rawDesc = `Compare ${jersey.team} ${jersey.kitType} jersey prices from $${jersey.priceUSD} for replicas to $${jersey.priceUSDAuthentic} for authentic match editions on JerseyBird.`;
  if (rawDesc.length >= 140 && rawDesc.length <= 160) {
    return rawDesc;
  }
  if (rawDesc.length < 140) {
    const padded = `Compare official ${jersey.team} ${jersey.kitType} jersey prices from $${jersey.priceUSD} for replicas to $${jersey.priceUSDAuthentic} for authentic editions with badge options on JerseyBird.`;
    return padded.length > 160 ? padded.slice(0, 157) + '...' : padded;
  }
  return rawDesc.slice(0, 157) + '...';
}

export function updateMetaTags(meta: {
  title: string;
  description: string;
  urlPath: string;
  image?: string;
}) {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  document.title = meta.title;

  const origin = window.location.origin;
  const fullUrl = `${origin}${meta.urlPath}`;

  // Helper to set or create a meta tag
  const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
    let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attributeName, attributeValue);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // 2. Standard Meta Description
  setMetaTag('name', 'description', meta.description);

  // 3. OpenGraph Tags
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', fullUrl);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:site_name', 'JerseyBird');
  if (meta.image) {
    setMetaTag('property', 'og:image', meta.image);
  }

  // 4. Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  if (meta.image) {
    setMetaTag('name', 'twitter:image', meta.image);
  }

  // 5. Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // 6. JSON-LD Structured Data
  let jsonLdScript = document.getElementById('jerseybird-jsonld');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'jerseybird-jsonld';
    jsonLdScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(jsonLdScript);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: meta.title,
    description: meta.description,
    url: fullUrl,
    publisher: {
      '@type': 'Organization',
      name: 'JerseyBird',
      url: origin,
    },
  };

  jsonLdScript.textContent = JSON.stringify(structuredData);
}
