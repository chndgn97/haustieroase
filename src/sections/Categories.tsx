import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Dog, Cat, Rabbit, Bird, Fish, Package } from 'lucide-react';

const categories = [
  {
    name: 'Hunde',
    description: 'Futter, Spielzeug & Pflege',
    image: '/images/category-dogs.jpg',
    icon: Dog,
    color: 'from-petal-pink to-rose-300',
    count: '250+ Produkte',
  },
  {
    name: 'Katzen',
    description: 'Kratzbäume, Futter & Co.',
    image: '/images/category-cats.jpg',
    icon: Cat,
    color: 'from-mint-green to-teal-300',
    count: '180+ Produkte',
  },
  {
    name: 'Kleintiere',
    description: 'Für Kaninchen, Hamster & Co.',
    image: '/images/category-small.jpg',
    icon: Rabbit,
    color: 'from-peach to-orange-300',
    count: '120+ Produkte',
  },
  {
    name: 'Vögel',
    description: 'Käfige, Futter & Spielzeug',
    image: '/images/category-birds.jpg',
    icon: Bird,
    color: 'from-yellow-400 to-peach',
    count: '80+ Produkte',
  },
  {
    name: 'Aquaristik',
    description: 'Aquarien, Zubehör & Futter',
    image: '/images/category-aqua.jpg',
    icon: Fish,
    color: 'from-cyan-400 to-mint-green',
    count: '150+ Produkte',
  },
  {
    name: 'Zubehör',
    description: 'Alles für dein Haustier',
    image: '/images/product-collar.jpg',
    icon: Package,
    color: 'from-purple-400 to-petal-pink',
    count: '300+ Produkte',
  },
];

const Categories = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
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

  return (
    <section id="categories" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-pink-mint" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-nunito text-sm font-semibold text-mint-green uppercase tracking-wider mb-4">
            Entdecke mehr
          </span>
          <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-brown mb-6">
            Unsere <span className="text-gradient">Kategorien</span>
          </h2>
          <p className="font-nunito text-lg text-warm-brown/70 max-w-2xl mx-auto">
            Finde genau das, was dein Haustier braucht – von Futter bis Spielzeug.
          </p>
        </div>

        {/* Categories Grid - Bento Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isVisible = visibleCards.includes(index);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={category.name}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ${
                  index === 0 || index === 3
                    ? 'col-span-2 row-span-2 lg:col-span-2 lg:row-span-2'
                    : 'col-span-1 row-span-1'
                } ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                  height: index === 0 || index === 3 ? '320px' : '200px',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 transition-opacity duration-300 ${
                      isHovered ? 'opacity-80' : 'opacity-60'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                      isHovered ? 'scale-110 bg-white/30' : ''
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Text */}
                  <h3 className="font-fredoka text-xl lg:text-2xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p
                    className={`font-nunito text-sm text-white/80 mb-2 transition-all duration-300 ${
                      isHovered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2'
                    }`}
                  >
                    {category.description}
                  </p>

                  {/* Count & Arrow */}
                  <div className="flex items-center justify-between">
                    <span className="font-nunito text-xs text-white/70">
                      {category.count}
                    </span>
                    <div
                      className={`w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-2'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Decorative Paw */}
                <div
                  className={`absolute top-4 right-4 transition-all duration-500 ${
                    isHovered
                      ? 'opacity-100 rotate-12'
                      : 'opacity-30 rotate-0'
                  }`}
                >
                  <Icon className="w-8 h-8 text-white/30" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 font-nunito font-semibold text-warm-brown hover:text-petal-pink transition-colors group">
            Alle Kategorien ansehen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
