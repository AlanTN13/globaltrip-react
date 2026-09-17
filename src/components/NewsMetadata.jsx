import { useEffect } from 'react';
import { getNewsMetadata } from '../lib/newsMetadata';

export default function NewsMetadata({ post }) {
  useEffect(() => {
    const metadata = getNewsMetadata(post, window.location.origin);
    const selector = 'title, link[rel="canonical"], meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], meta[property^="article:"]';
    const previous = [...document.head.querySelectorAll(selector)];
    previous.forEach((node) => node.remove());
    const title = document.createElement('title');
    title.textContent = metadata.title;
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = metadata.canonical;
    const nodes = [title, canonical, ...metadata.tags.map(([attribute, name, content]) => {
      const node = document.createElement('meta');
      node.setAttribute(attribute, name);
      node.content = content;
      return node;
    })];
    document.head.append(...nodes);
    return () => {
      nodes.forEach((node) => node.remove());
      document.head.append(...previous);
    };
  }, [post]);
  return null;
}
