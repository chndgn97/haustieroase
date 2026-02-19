import { useState, useRef, useEffect } from 'react';
import { Mail, Send, Check, Sparkles, Gift, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const benefits = [
  { icon: Gift, text: 'Exklusive Angebote' },
  { icon: Bell, text: 'Neueste Ratgeber' },
  { icon: Sparkles, text: 'Gewinnspiele' },
];

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-petal-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-mint-green/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`bg-white rounded-[3rem] shadow-pet p-8 lg:p-16 relative overflow-hidden transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-petal-pink/20 to-peach/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-mint-green/20 to-cyan-200/20 rounded-full blur-2xl" />

          {/* Floating Icons */}
          <div className="absolute top-8 left-8 animate-float">
            <Mail className="w-8 h-8 text-petal-pink/30" />
          </div>
          <div
            className="absolute top-12 right-12 animate-float"
            style={{ animationDelay: '1s' }}
          >
            <Sparkles className="w-6 h-6 text-peach/40" />
          </div>
          <div
            className="absolute bottom-8 right-16 animate-float"
            style={{ animationDelay: '0.5s' }}
          >
            <Gift className="w-7 h-7 text-mint-green/30" />
          </div>

          {/* Content */}
          <div className="relative text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-petal-pink to-peach rounded-3xl mb-8 animate-bounce-gentle">
              <Mail className="w-10 h-10 text-white" />
            </div>

            {/* Heading */}
            <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-brown mb-4">
              Bleib auf dem <span className="text-gradient">Laufenden</span>
            </h2>

            {/* Description */}
            <p className="font-nunito text-lg text-warm-brown/70 mb-8 max-w-xl mx-auto">
              Erhalte die besten Tipps, exklusive Angebote und die neuesten
              Ratgeber direkt in dein Postfach. Kostenlos und jederzeit
              abbestellbar.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.text}
                    className="flex items-center gap-2 bg-cream rounded-full px-4 py-2"
                  >
                    <Icon className="w-4 h-4 text-petal-pink" />
                    <span className="font-nunito text-sm font-medium text-warm-brown">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-brown/40" />
                  <Input
                    type="email"
                    placeholder="Deine E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 rounded-full border-2 border-cream focus:border-petal-pink focus:ring-petal-pink/20 font-nunito text-warm-brown placeholder:text-warm-brown/40"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-semibold rounded-full px-8 py-6 shadow-pet hover:shadow-pet-hover transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Anmelden
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-4 animate-scale-in">
                <div className="w-16 h-16 bg-mint-green rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-fredoka text-2xl font-semibold text-warm-brown">
                  Vielen Dank!
                </h3>
                <p className="font-nunito text-warm-brown/70">
                  Du erhältst bald eine Bestätigungs-E-Mail.
                </p>
              </div>
            )}

            {/* Privacy Note */}
            {!isSubmitted && (
              <p className="mt-4 text-xs font-nunito text-warm-brown/50">
                Mit der Anmeldung stimmst du unserer{' '}
                <a href="#" className="underline hover:text-petal-pink">
                  Datenschutzerklärung
                </a>{' '}
                zu.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
