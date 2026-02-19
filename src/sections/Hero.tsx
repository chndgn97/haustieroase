import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Floating paw prints
  const pawPrints = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${10 + i * 15}%`,
    top: `${20 + (i % 3) * 25}%`,
    delay: i * 0.8,
    size: 20 + (i % 3) * 10,
  }));

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Cozy pets"
          className="w-full h-full object-cover scale-105 animate-[pulse-soft_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white/60 via-warm-white/40 to-warm-white/80" />
      </div>

      {/* Floating Paw Prints */}
      {pawPrints.map((paw) => (
        <div
          key={paw.id}
          className="absolute opacity-20 pointer-events-none"
          style={{
            left: paw.left,
            top: paw.top,
            animation: `float ${4 + paw.delay * 0.5}s ease-in-out infinite`,
            animationDelay: `${paw.delay}s`,
          }}
        >
          <Heart
            className="text-petal-pink"
            style={{ width: paw.size, height: paw.size }}
          />
        </div>
      ))}

      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-petal-pink/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-mint-green/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-peach/30 rounded-full blur-2xl animate-pulse-soft" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-soft animate-bounce-gentle"
              style={{ animationDelay: '0.5s' }}
            >
              <Sparkles className="w-4 h-4 text-peach" />
              <span className="text-sm font-nunito font-medium text-warm-brown">
                Dein tierischer Begleiter
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-brown mb-6 leading-tight">
              Willkommen in der{' '}
              <span className="relative inline-block">
                <span className="text-gradient">HaustierOase</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="#f8a5b3"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="animate-[dash_2s_ease-in-out_infinite]"
                    style={{
                      strokeDasharray: 200,
                      strokeDashoffset: 0,
                    }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-nunito text-lg sm:text-xl text-warm-brown/80 mb-4">
              Dein Ort für tierische Empfehlungen
            </p>

            {/* Description */}
            <p className="font-nunito text-base text-warm-brown/70 mb-8 max-w-lg mx-auto lg:mx-0">
              Entdecke die besten Produkte, Tipps und Geschichten für deine
              pelzigen Freunde. Bei uns steht das Wohlbefinden deines Haustiers
              an erster Stelle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-semibold rounded-full px-8 py-6 text-lg shadow-pet hover:shadow-pet-hover transition-all duration-300 hover:-translate-y-1 group"
              >
                Jetzt entdecken
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-mint-green text-mint-green font-fredoka font-semibold rounded-full px-8 py-6 text-lg hover:bg-mint-green hover:text-white transition-all duration-300"
              >
                Mehr erfahren
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10 justify-center lg:justify-start">
              {[
                { value: '500+', label: 'Produkte' },
                { value: '200+', label: 'Ratgeber' },
                { value: '50K+', label: 'Happy Pets' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center"
                  style={{
                    animationDelay: `${0.8 + index * 0.2}s`,
                  }}
                >
                  <div className="font-fredoka text-2xl sm:text-3xl font-bold text-petal-pink">
                    {stat.value}
                  </div>
                  <div className="font-nunito text-sm text-warm-brown/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Logo Display */}
          <div
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-petal-pink/30 to-mint-green/30 rounded-full blur-3xl scale-150 animate-pulse-soft" />

              {/* Main Logo */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 animate-float">
                <img
                  src="/images/logo.png"
                  alt="HaustierOase Logo"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-peach rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div
                className="absolute -bottom-4 -left-4 w-14 h-14 bg-mint-green rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg"
                style={{ animationDelay: '0.5s' }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#fff9f5"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
