import { useEffect } from 'react';
import { getRouteMeta } from '../data/routeMeta';

// Setzt document.title, meta[name=description], OpenGraph-Tags, Twitter-Card
// und canonical pro activeTab. Laeuft clientseitig beim Tab-Wechsel.
// Fuer non-JS-Crawler bleibt der im index.html verankerte Default-Satz sichtbar;
// der Hook ergaenzt nur nach der Hydration.

const setOrCreateMeta = (attribute, key, value) => {
  if (typeof document === 'undefined' || !value) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  if (element.getAttribute('content') !== value) {
    element.setAttribute('content', value);
  }
};

const setCanonical = (href) => {
  if (typeof document === 'undefined' || !href) return;

  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  if (link.getAttribute('href') !== href) {
    link.setAttribute('href', href);
  }
};

export default function useDocumentMeta(activeTab) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const meta = getRouteMeta(activeTab);

    if (document.title !== meta.title) {
      document.title = meta.title;
    }

    setOrCreateMeta('name', 'description', meta.description);
    setOrCreateMeta('property', 'og:title', meta.ogTitle);
    setOrCreateMeta('property', 'og:description', meta.ogDescription);
    setOrCreateMeta('property', 'og:image', meta.ogImage);
    setOrCreateMeta('property', 'og:url', meta.canonical);
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', meta.ogTitle);
    setOrCreateMeta('name', 'twitter:description', meta.ogDescription);
    setOrCreateMeta('name', 'twitter:image', meta.ogImage);
    setCanonical(meta.canonical);
  }, [activeTab]);
}
