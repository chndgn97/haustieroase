import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLatestBlogPosts } from "../data/blogPosts";

function formatCategory(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const Blog = () => {
  const latestPosts = getLatestBlogPosts(4);

  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  const toggleSave = (slug: string) => {
    setSavedPosts((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <section id="blog" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-mint-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-petal-pink/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <span className="inline-block font-nunito text-sm font-semibold text-petal-pink uppercase tracking-wider mb-4">
              Aktuelles
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-brown mb-4">
              Aktuelle <span className="text-gradient">Ratgeber</span>
            </h2>
            <p className="font-nunito text-lg text-warm-brown/70 max-w-xl">
              Entdecke hilfreiche Tipps, Tricks und Expertenwissen für die Pflege deines Haustiers.
            </p>
          </div>

          {/* Link zu /blog */}
          <Link to="/blog" className="mt-6 lg:mt-0 inline-block">
            <Button
              variant="outline"
              className="border-2 border-warm-brown/20 text-warm-brown font-fredoka font-medium rounded-full px-6 hover:bg-warm-brown hover:text-white transition-all duration-300 group"
            >
              Alle Artikel
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {latestPosts.map((post, index) => {
            const isVisible = visibleCards.includes(index);
            const isSaved = savedPosts.includes(post.slug);

            const author = post.author ?? "HaustierOase";
            const date = formatDate(post.date);
            const readTime = post.readTime ?? "";
            const categoryLabel = formatCategory(post.category);

            const categoryColor =
              post.category === "hunde"
                ? "bg-mint-green"
                : post.category === "katzen"
                ? "bg-peach"
                : "bg-petal-pink";

            return (
              <div
                key={post.slug}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-pet-hover transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Image (clickable) */}
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative h-56 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-cream flex items-center justify-center text-warm-brown/40 text-sm">
                        Kein Bild verfügbar
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-4 left-4 ${categoryColor} text-white text-xs font-nunito font-semibold px-3 py-1 rounded-full`}
                    >
                      {categoryLabel}
                    </div>
                  </div>
                </Link>

                {/* Save Button */}
                <button
                  onClick={() => toggleSave(post.slug)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSaved
                      ? "bg-petal-pink text-white"
                      : "bg-white/80 backdrop-blur-sm text-warm-brown hover:bg-white"
                  }`}
                  aria-label="Beitrag speichern"
                  type="button"
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                </button>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm text-warm-brown/60">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="font-nunito">{author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-nunito">{date}</span>
                    </div>
                    {readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-nunito">{readTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <Link to={`/blog/${post.slug}`} className="block">
                    <h3 className="font-fredoka text-xl font-semibold text-warm-brown mb-3 group-hover:text-petal-pink transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="font-nunito text-warm-brown/70 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read more */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-nunito font-semibold text-petal-pink hover:text-mint-green transition-colors group/link"
                  >
                    Weiterlesen
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-petal-pink via-mint-green to-peach transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;