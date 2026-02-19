import { useEffect, useRef, useState } from 'react';
import { BookOpen, Award, Users, Shield, Star, Heart } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Expertentipps',
    description:
      'Von Tierärzten und erfahrenen Tierliebhabern geprüfte Inhalte für die beste Pflege deines Haustiers.',
    color: 'from-petal-pink to-peach',
    bgColor: 'bg-petal-pink/10',
  },
  {
    icon: Award,
    title: 'Qualitätsprodukte',
    description:
      'Nur das Beste für deinen tierischen Begleiter, sorgfältig ausgewählt und getestet.',
    color: 'from-mint-green to-teal-400',
    bgColor: 'bg-mint-green/10',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'Tausche dich mit gleichgesinnten Tierliebhabern aus und teile deine Erfahrungen.',
    color: 'from-peach to-orange-300',
    bgColor: 'bg-peach/10',
  },
  {
    icon: Shield,
    title: 'Vertrauenswürdig',
    description:
      'Unabhängige Bewertungen und ehrliche Empfehlungen ohne versteckte Agenda.',
    color: 'from-petal-pink to-rose-300',
    bgColor: 'bg-petal-pink/10',
  },
  {
    icon: Star,
    title: 'Top Bewertet',
    description:
      'Unsere Empfehlungen basieren auf echten Kundenbewertungen und Tests.',
    color: 'from-yellow-400 to-peach',
    bgColor: 'bg-yellow-400/10',
  },
  {
    icon: Heart,
    title: 'Mit Liebe',
    description:
      'Jeder Artikel und jedes Produkt wird mit viel Herzblut für dich ausgewählt.',
    color: 'from-rose-400 to-petal-pink',
    bgColor: 'bg-rose-400/10',
  },
];

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-petal-pink/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-mint-green/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-nunito text-sm font-semibold text-petal-pink uppercase tracking-wider mb-4">
            Unsere Stärken
          </span>
          <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-brown mb-6">
            Warum <span className="text-gradient">HaustierOase</span>?
          </h2>
          <p className="font-nunito text-lg text-warm-brown/70 max-w-2xl mx-auto">
            Wir sind mehr als nur ein Blog – wir sind dein vertrauenswürdiger
            Partner für alles rund um dein Haustier.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={feature.title}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-pet-hover transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text`}
                    style={{
                      color: index % 3 === 0 ? '#f8a5b3' : index % 3 === 1 ? '#7bd0c1' : '#f9c89a',
                    }}
                  />
                </div>

                {/* Content */}
                <h3 className="font-fredoka text-xl font-semibold text-warm-brown mb-3 group-hover:text-petal-pink transition-colors">
                  {feature.title}
                </h3>
                <p className="font-nunito text-warm-brown/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Decoration */}
                <div
                  className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300`}
                />

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-petal-pink to-peach opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="font-nunito text-warm-brown/60 mb-4">
            Überzeuge dich selbst von unserer Qualität
          </p>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-peach fill-peach animate-pulse-soft"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
            <span className="ml-2 font-fredoka font-semibold text-warm-brown">
              4.9/5
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
