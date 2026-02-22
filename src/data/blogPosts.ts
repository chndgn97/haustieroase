export type BlogPostMeta = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  readTime: string
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "getreidefreies-hundefutter",
    title: "Getreidefreies Hundefutter – Sinnvoll oder Marketing?",
    excerpt:
      "Viele Hundehalter berichten von besserer Verträglichkeit. Wir schauen auf Inhaltsstoffe, Vor- & Nachteile.",
    category: "Hunde",
    date: "2026-02-22",
    image: "/images/category-dogs.jpg",
    readTime: "5 min",
  },
  {
    slug: "orthopaedisches-hundebett",
    title: "Orthopädisches Hundebett – Für wen lohnt es sich wirklich?",
    excerpt:
      "Gerade bei älteren Hunden kann ein gutes Bett viel ausmachen. Worauf du beim Kauf achten solltest.",
    category: "Hunde",
    date: "2026-02-22",
    image: "/images/product-bed.jpg",
    readTime: "4 min",
  },
  {
    slug: "katzenfutter-zucker",
    title: "Katzenfutter & Zucker – warum du genau hinschauen solltest",
    excerpt:
      "Viele Sorten enthalten versteckte Zusätze. So erkennst du Qualität und vermeidest unnötige Inhaltsstoffe.",
    category: "Katzen",
    date: "2026-02-22",
    image: "/images/category-cats.jpg",
    readTime: "6 min",
  },
]