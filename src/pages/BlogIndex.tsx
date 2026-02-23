import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { ArrowRight } from "lucide-react";

// Datum schön formatieren
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Kategorie Label sauber anzeigen
function formatCategory(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function BlogIndex() {
  // Neueste zuerst
  const sortedPosts = [...blogPosts].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-fredoka text-4xl sm:text-5xl font-bold text-warm-brown">
            Ratgeber
          </h1>
          <p className="font-nunito text-warm-brown/70 mt-3">
            Tipps, Vergleiche & Empfehlungen – einfach erklärt.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-pet-hover transition-all duration-300"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* Bild */}
              <div className="h-44 bg-cream overflow-hidden">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-warm-brown/40 text-sm">
                    Kein Bild verfügbar
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-nunito text-warm-brown/60">
                  <span className="px-2 py-1 rounded-full bg-cream">
                    {formatCategory(post.category)}
                  </span>
                  <span>
                    {post.readTime ?? ""}{" "}
                    {post.readTime ? "•" : ""} {formatDate(post.date)}
                  </span>
                </div>

                <h2 className="font-fredoka text-xl font-semibold text-warm-brown mt-3 group-hover:text-petal-pink transition-colors">
                  {post.title}
                </h2>

                <p className="font-nunito text-sm text-warm-brown/70 mt-2">
                  {post.excerpt}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 font-nunito font-semibold text-warm-brown group-hover:text-petal-pink transition-colors">
                  Artikel lesen{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}