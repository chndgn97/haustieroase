import { useEffect, useRef, useState } from 'react';
import { Store, ArrowRight, Package, Truck, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Package, text: 'Eigene Designts' },
  { icon: Truck, text: 'Schneller Versand' },
  { icon: Shield, text: 'Qualitätsgarantie' },
];

const ShopTeaser = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-petal-pink/5 via-mint-green/5 to-peach/5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-petal-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-mint-green/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`bg-white rounded-[3rem] shadow-pet p-8 lg:p-16 relative overflow-hidden transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Coming Soon Badge */}
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-petal-pink to-peach text-white text-sm font-nunito font-bold px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              Coming Soon
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-mint-green/10 rounded-full px-4 py-2 mb-6">
                <Store className="w-5 h-5 text-mint-green" />
                <span className="font-nunito text-sm font-semibold text-mint-green">
                  Bald verfügbar
                </span>
              </div>

              <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-brown mb-6">
                Unser eigener{' '}
                <span className="text-gradient">Shop</span> kommt!
              </h2>

              <p className="font-nunito text-lg text-warm-brown/70 mb-8">
                Bald kannst du bei uns nicht nur Empfehlungen finden, sondern
                auch exklusive, selbst designte Produkte für deine pelzigen
                Freunde direkt kaufen.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-8">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.text}
                      className="flex items-center gap-2 bg-cream rounded-full px-4 py-2"
                    >
                      <Icon className="w-4 h-4 text-petal-pink" />
                      <span className="font-nunito text-sm font-medium text-warm-brown">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Notify Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="email"
                    placeholder="E-Mail für Benachrichtigung"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 rounded-full border-2 border-cream focus:border-petal-pink focus:outline-none font-nunito text-warm-brown"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-medium rounded-full px-6 hover:shadow-pet transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-3 text-mint-green font-nunito font-medium">
                  <div className="w-8 h-8 bg-mint-green rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Wir benachrichtigen dich!
                </div>
              )}
            </div>

            {/* Right Content - Preview Cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-petal-pink/20 to-peach/20 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center">
                  <Package className="w-12 h-12 text-petal-pink mb-3" />
                  <span className="font-fredoka text-lg font-semibold text-warm-brown">Halsbänder</span>
                </div>
                <div className="bg-gradient-to-br from-mint-green/20 to-teal-200/20 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center mt-8">
                  <Package className="w-12 h-12 text-mint-green mb-3" />
                  <span className="font-fredoka text-lg font-semibold text-warm-brown">Spielzeug</span>
                </div>
                <div className="bg-gradient-to-br from-peach/20 to-orange-200/20 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center -mt-8">
                  <Package className="w-12 h-12 text-peach mb-3" />
                  <span className="font-fredoka text-lg font-semibold text-warm-brown">Accessoires</span>
                </div>
                <div className="bg-gradient-to-br from-purple-400/20 to-pink-200/20 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center">
                  <Package className="w-12 h-12 text-purple-400 mb-3" />
                  <span className="font-fredoka text-lg font-semibold text-warm-brown">Pflege</span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-pet">
                <span className="font-nunito font-semibold text-warm-brown">
                  + weitere Kategorien
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopTeaser;
