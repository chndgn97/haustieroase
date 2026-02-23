import { Link, useParams } from "react-router-dom";
import { getBlogPostBySlug } from "../data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getBlogPostBySlug(slug) : undefined;

  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="font-fredoka text-3xl text-warm-brown">
            Artikel nicht gefunden
          </h1>
          <p className="font-nunito text-warm-brown/70 mt-3">
            Der Link ist ungültig oder der Artikel existiert nicht.
          </p>
          <Link
            to="/blog"
            className="inline-flex mt-6 font-nunito font-semibold text-petal-pink"
          >
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  const Post = entry.component;
  return <Post />;
}