import { Link } from "react-router-dom";
import { getLatestBlogPosts } from "../data/blogPosts";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const latestPosts = getLatestBlogPosts(3);

  return (
    <section className="py-16 bg-gradient-to-b from-warm-white via-cream to-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-warm-brown">
              Aktuelle Ratgeber
            </h2>
            <p className="font-nunito text-warm-brown/70 mt-2">
              Unsere neuesten Tipps & Empfehlungen.
            </p>
          </div>

          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-2 font-nunito font-semibold text-warm-brown hover:text-petal-pink transition-colors"
          >
            Alle Artikel <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
<pre className="text-xs text-warm-brown/60 mb-6">
  {JSON.stringify(latestPosts.map(p => p.slug), null, 2)}
</pre>
        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
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
                  <span className="px-2 py-1 rounded-full bg-cream capitalize">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-fredoka text-lg font-semibold text-warm-brown mt-3 group-hover:text-petal-pink transition-colors">
                  {post.title}
                </h3>

                <p className="font-nunito text-sm text-warm-brown/70 mt-2">
                  {post.excerpt}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 font-nunito font-semibold text-warm-brown group-hover:text-petal-pink transition-colors">
                  Weiterlesen{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-nunito font-semibold text-warm-brown hover:text-petal-pink transition-colors"
          >
            Alle Artikel ansehen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}