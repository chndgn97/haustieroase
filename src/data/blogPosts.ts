import type { ComponentType } from "react";

import GetreidefreiesHundefutter from "../pages/blog/GetreidefreiesHundefutter";
import OrthopaedischesHundebett from "../pages/blog/OrthopaedischesHundebett";
import KatzenfutterZucker from "../pages/blog/KatzenfutterZucker";

export type BlogPostCategory =
  | "hunde"
  | "katzen"
  | "kleintiere"
  | "vogel"
  | "aquaristik";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogPostCategory;

  /** Publish date in ISO format: YYYY-MM-DD */
  date: string;

  image?: string;
  readTime?: string;
  tag?: string;
  author?: string;

  /** Optional: if you later want "recently updated" sorting */
  updatedAt?: string;
};

export type BlogPostEntry = BlogPostMeta & {
  component: ComponentType;
};

export const blogPosts: BlogPostEntry[] = [
  {
    slug: "getreidefreies-hundefutter",
    title: "Getreidefreies Hundefutter – Sinnvoll oder Marketing?",
    excerpt:
      "Viele Hundehalter berichten von besserer Verträglichkeit. Wir schauen auf Inhaltsstoffe, Vor- & Nachteile.",
    category: "hunde",
    date: "2026-02-20", // ✅ geändert
    image: "/images/category-dogs.jpg",
    readTime: "5 Min.",
    tag: "Ernährung",
    author: "HaustierOase",
    component: GetreidefreiesHundefutter,
  },
  {
    slug: "orthopaedisches-hundebett",
    title: "Orthopädisches Hundebett – Für wen lohnt es sich wirklich?",
    excerpt:
      "Gerade bei älteren Hunden kann ein gutes Bett viel ausmachen. Worauf du beim Kauf achten solltest.",
    category: "hunde",
    date: "2026-02-21", // ✅ geändert
    image: "/images/product-bed.jpg",
    readTime: "4 Min.",
    tag: "Gesundheit",
    author: "HaustierOase",
    component: OrthopaedischesHundebett,
  },
  {
    slug: "katzenfutter-zucker",
    title: "Katzenfutter & Zucker – warum du genau hinschauen solltest",
    excerpt:
      "Viele Sorten enthalten versteckte Zusätze. So erkennst du Qualität und vermeidest unnötige Inhaltsstoffe.",
    category: "katzen",
    date: "2026-02-22", // ✅ bleibt neuestes
    image: "/images/category-cats.jpg",
    readTime: "6 Min.",
    tag: "Ernährung",
    author: "HaustierOase",
    component: KatzenfutterZucker,
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

/**
 * Latest posts:
 * - primary sort: updatedAt (if present) else date
 * - tie-breaker: original array order (stable)
 */
export const getLatestBlogPosts = (count = 4) => {
  return blogPosts
    .map((p, index) => ({
      p,
      index,
      sortKey: (p.updatedAt ?? p.date) || "",
    }))
    .sort((a, b) => {
      const byDate = b.sortKey.localeCompare(a.sortKey);
      if (byDate !== 0) return byDate;
      // If same date, keep newest by manual order (later in array = newer)
      return b.index - a.index;
    })
    .slice(0, count)
    .map((x) => x.p);
};

export const getBlogPostsByCategory = (category: BlogPostCategory) =>
  blogPosts.filter((p) => p.category === category);