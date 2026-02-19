import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ArrowRight, User, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Die besten Tipps für die Gesundheit deines Hundes',
    excerpt:
      'Erfahre, wie du deinen vierbeinigen Freund gesund und glücklich hältst. Von Ernährung bis Bewegung – alles Wichtige im Überblick.',
    image: '/images/blog-health.jpg',
    author: 'Dr. Sarah Müller',
    date: '15. Feb 2026',
    readTime: '5 Min.',
    category: 'Gesundheit',
    categoryColor: 'bg-petal-pink',
  },
  {
    id: 2,
    title: 'Hundetraining: Die Basics für Anfänger',
    excerpt:
      'Mit positiver Verstärkung und Geduld zum erfolgreichen Training. So lernt dein Hund schnell und mit Freude.',
    image: '/images/blog-training.jpg',
    author: 'Markus Weber',
    date: '12. Feb 2026',
    readTime: '8 Min.',
    category: 'Training',
    categoryColor: 'bg-mint-green',
  },
  {
    id: 3,
    title: 'Gesunde Ernährung für Katzen',
    excerpt:
      'Was braucht deine Katze wirklich? Wir zeigen dir die wichtigsten Nährstoffe und geben Tipps zur Fütterung.',
    image: '/images/blog-nutrition.jpg',
    author: 'Lisa Schmidt',
    date: '10. Feb 2026',
    readTime: '6 Min.',
    category: 'Ernährung',
    categoryColor: 'bg-peach',
  },
  {
    id: 4,
    title: 'Der erste Tag mit deinem Welpen',
    excerpt:
      'Alles, was du für einen erfolgreichen Start mit deinem neuen Familienmitglied wissen musst.',
    image: '/images/blog-puppy.jpg',
    author: 'Anna Peters',
    date: '8. Feb 2026',
    readTime: '7 Min.',
    category: 'Welpen',
    categoryColor: 'bg-yellow-400',
  },
];

const Blog = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
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
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  const toggleSave = (id: number) => {
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
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
              Entdecke hilfreiche Tipps, Tricks und Expertenwissen für die
              Pflege deines Haustiers.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-6 lg:mt-0 border-2 border-warm-brown/20 text-warm-brown font-fredoka font-medium rounded-full px-6 hover:bg-warm-brown hover:text-white transition-all duration-300 group"
          >
            Alle Artikel
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => {
            const isVisible = visibleCards.includes(index);
            const isSaved = savedPosts.includes(post.id);

            return (
              <div
                key={post.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-pet-hover transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 0.15}s`,
                }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Category Badge */}
                  <div
                    className={`absolute top-4 left-4 ${post.categoryColor} text-white text-xs font-nunito font-semibold px-3 py-1 rounded-full`}
                  >
                    {post.category}
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSaved
                        ? 'bg-petal-pink text-white'
                        : 'bg-white/80 backdrop-blur-sm text-warm-brown hover:bg-white'
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3 text-sm text-warm-brown/60">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="font-nunito">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-nunito">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-nunito">{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-fredoka text-xl font-semibold text-warm-brown mb-3 group-hover:text-petal-pink transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-nunito text-warm-brown/70 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 font-nunito font-semibold text-petal-pink hover:text-mint-green transition-colors group/link"
                  >
                    Weiterlesen
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-petal-pink via-mint-green to-peach transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Newsletter Teaser */}
        <div className="mt-16 bg-gradient-to-r from-petal-pink/10 via-mint-green/10 to-peach/10 rounded-3xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-fredoka text-2xl font-semibold text-warm-brown mb-2">
                Keinen Artikel mehr verpassen!
              </h3>
              <p className="font-nunito text-warm-brown/70">
                Abonniere unseren Newsletter und erhalte die neuesten Ratgeber
                direkt in dein Postfach.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-semibold rounded-full px-8 shadow-pet hover:shadow-pet-hover transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
            >
              Newsletter abonnieren
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
