import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { useState } from "react";

// Google Logo SVG
function GoogleLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// Data ulasan Google
const googleReviews = [
  {
    name: "angelcho dimov",
    time: "5 maanden geleden",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Deze gebruiker heeft alleen een beoordeling achtergelaten.",
    verified: true,
  },
  {
    name: "Ivan Dimitrov",
    time: "5 maanden geleden",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The best partner for your biznes dream.",
    verified: false,
  },
  {
    name: "Ansarul Haque",
    time: "10 maanden geleden",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Zeer betrouwbare en professionele transportdienst! Pro Max levert altijd op tijd en communiceert duidelijk. Perfecte partner voor logistieke oplossingen.",
    verified: true,
  },
  {
    name: "Kumcu 81",
    time: "10 maanden geleden",
    avatar: "https://ui-avatars.com/api/?name=Kumcu+81&background=8B5CF6&color=fff",
    rating: 5,
    text: "Deze gebruiker heeft alleen een beoordeling achtergelaten.",
    verified: true,
  },
  {
    name: "Stephania",
    time: "10 maanden geleden",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Fantastische service! Altijd op tijd en zeer vriendelijk personeel.",
    verified: true,
  },
];

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="relative overflow-hidden border-t border-white/5 bg-background">
        {/* Premium gradient glow background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />
        </div>
        
        {/* Tire tread pattern background WOW */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <svg 
            viewBox="0 0 1440 600" 
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="tireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f07f1c" />
                <stop offset="50%" stopColor="#ff6b35" />
                <stop offset="100%" stopColor="#f07f1c" />
              </linearGradient>
              
              {/* Tire tread pattern 1 */}
              <pattern id="tireTread1" x="0" y="0" width="120" height="100" patternUnits="userSpaceOnUse">
                <g fill="#ffffff">
                  {/* Zig-zag tread blocks */}
                  <path d="M10 20 L30 10 L50 20 L70 10 L90 20 L110 10 L110 40 L90 50 L70 40 L50 50 L30 40 L10 50 Z" />
                  <path d="M10 60 L30 50 L50 60 L70 50 L90 60 L110 50 L110 80 L90 90 L70 80 L50 90 L30 80 L10 90 Z" />
                  {/* Small grooves */}
                  <circle cx="20" cy="30" r="3" />
                  <circle cx="60" cy="30" r="3" />
                  <circle cx="100" cy="30" r="3" />
                  <circle cx="40" cy="70" r="3" />
                  <circle cx="80" cy="70" r="3" />
                </g>
              </pattern>
              
              {/* Tire tread pattern 2 (mirror) */}
              <pattern id="tireTread2" x="0" y="0" width="120" height="100" patternUnits="userSpaceOnUse">
                <g fill="#ffffff" transform="translate(120,0) scale(-1,1)">
                  <path d="M10 20 L30 10 L50 20 L70 10 L90 20 L110 10 L110 40 L90 50 L70 40 L50 50 L30 40 L10 50 Z" />
                  <path d="M10 60 L30 50 L50 60 L70 50 L90 60 L110 50 L110 80 L90 90 L70 80 L50 90 L30 80 L10 90 Z" />
                  <circle cx="20" cy="30" r="3" />
                  <circle cx="60" cy="30" r="3" />
                  <circle cx="100" cy="30" r="3" />
                  <circle cx="40" cy="70" r="3" />
                  <circle cx="80" cy="70" r="3" />
                </g>
              </pattern>
            </defs>
            
            {/* Two tire tracks (left and right) */}
            <rect x="50" y="0" width="180" height="600" fill="url(#tireTread1)" />
            <rect x="1210" y="0" width="180" height="600" fill="url(#tireTread2)" />
            
            {/* Center decorative tire elements */}
            <g opacity="0.5">
              <circle cx="720" cy="300" r="120" fill="none" stroke="#ffffff" strokeWidth="2" />
              <circle cx="720" cy="300" r="80" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="720" cy="300" r="40" fill="none" stroke="#ffffff" strokeWidth="1" />
              {/* Lug nuts */}
              {[0, 60, 120, 180, 240, 300].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x = 720 + Math.cos(rad) * 100;
                const y = 300 + Math.sin(rad) * 100;
                return <circle key={angle} cx={x} cy={y} r="8" fill="#ffffff" />;
              })}
            </g>
          </svg>
        </div>

        <div className="relative mx-auto max-w-[1480px] px-6 pt-24 pb-10 lg:px-10">
          <div className="grid gap-16 md:grid-cols-12">
            {/* Company Info */}
            <div className="md:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Over ons
              </p>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                ProMax Transport is een toonaangevend transportbedrijf voor alle branches.
              </p>
              
              <div className="mt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  Volg ons
                </p>
                <div className="flex gap-4">
                  <a href="#" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/70 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/70 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/70 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary">
                    <Instagram size={18} />
                  </a>
                </div>
              </div>

              {/* Rating badge premium with Google logo */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group mt-8 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-5 py-3 transition-all hover:border-primary/50 hover:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <GoogleLogo />
                  <div className="h-6 w-px bg-white/20" />
                  <div className="flex items-center gap-0.5">
                    {/* Premium Star 1 */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#premiumStarGradient)">
                      <defs>
                        <linearGradient id="premiumStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFD700" />
                          <stop offset="50%" stopColor="#FFC107" />
                          <stop offset="100%" stopColor="#FF9800" />
                        </linearGradient>
                        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" filter="url(#starGlow)" />
                    </svg>
                    {/* Premium Star 2 */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#premiumStarGradient)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" filter="url(#starGlow)" />
                    </svg>
                    {/* Premium Star 3 */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#premiumStarGradient)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" filter="url(#starGlow)" />
                    </svg>
                    {/* Premium Star 4 */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#premiumStarGradient)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" filter="url(#starGlow)" />
                    </svg>
                    {/* Premium Star 5 (70% filled for 4.7) */}
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <defs>
                        <clipPath id="halfStarClip">
                          <rect x="0" y="0" width="14" height="24" />
                        </clipPath>
                      </defs>
                      {/* Empty star background */}
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#4a4a4a" opacity="0.6" />
                      {/* Filled part (70%) */}
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#premiumStarGradient)" clipPath="url(#halfStarClip)" filter="url(#starGlow)" />
                    </svg>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">4.7 / 38 recensies</p>
                </div>
              </button>
            </div>

            {/* Menu */}
            <div className="md:col-span-2">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Menu
              </h4>
              <ul className="mt-5 space-y-3">
                <li><Link to="/" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Home
                </Link></li>
                <li><Link to="/about" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Over ons
                </Link></li>
                <li><Link to="/services" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Diensten
                </Link></li>
                <li><Link to="/contact" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Offerte aanvragen
                </Link></li>
                <li><Link to="/contact" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Contact
                </Link></li>
              </ul>
            </div>

            {/* Diensten */}
            <div className="md:col-span-3">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Diensten
              </h4>
              <ul className="mt-5 space-y-3">
                <li><Link to="/services" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Container transport
                </Link></li>
                <li><Link to="/services" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Op en overslag
                </Link></li>
                <li><Link to="/services" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Full truck loading
                </Link></li>
                <li><Link to="/services" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Distributie Zuid-Holland
                </Link></li>
                <li><Link to="/services" className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                  <span className="text-primary">›</span> Nachtdistributie
                </Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Contact
              </h4>
              <address className="mt-5 space-y-4 not-italic">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div className="text-sm text-foreground/80">
                    <p>Linschotenstraat 20A</p>
                    <p>3044AW Rotterdam</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-primary" />
                  <a href="tel:0107852339" className="text-sm text-foreground/80 transition-colors hover:text-primary">
                    010 785 2339
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-primary" />
                  <a href="mailto:info@promaxkoeriers.nl" className="text-sm text-foreground/80 transition-colors hover:text-primary">
                    info@promaxkoeriers.nl
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="shrink-0 text-primary" />
                  <p className="text-sm text-foreground/80">
                    24/7 bereikbaar
                  </p>
                </div>
              </address>

              {/* CTA */}
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-3 border-b border-primary pb-1 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
              >
                Offerte aanvragen
                <ArrowUpRight
                  size={16}
                  className="text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center">
            {/* Logo ProMax */}
            <div className="flex items-center gap-3">
              <img 
                src="/Logo-Promax2.svg" 
                alt="ProMax Transport & Logistiek" 
                className="h-10 w-auto"
              />
              <span className="font-display text-sm font-bold tracking-wide text-foreground">
                ProMax Transport &amp; Logistiek
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>© {new Date().getFullYear()} ProMax Transport &amp; Logistiek</span>
              <a href="#" className="hover:text-foreground transition-colors">Algemene voorwaarden</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Google Reviews Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-background p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5">
                  <GoogleLogo />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pro Max Transport &amp; Logistiek</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {/* Premium Star 1 */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="url(#modalStarGradient)">
                        <defs>
                          <linearGradient id="modalStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFD700" />
                            <stop offset="50%" stopColor="#FFC107" />
                            <stop offset="100%" stopColor="#FF9800" />
                          </linearGradient>
                          <filter id="modalStarGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" filter="url(#modalStarGlow)" />
                      </svg>
                      {/* Premium Star 2 */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="url(#modalStarGradient)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" filter="url(#modalStarGlow)" />
                      </svg>
                      {/* Premium Star 3 */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="url(#modalStarGradient)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" filter="url(#modalStarGlow)" />
                      </svg>
                      {/* Premium Star 4 */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="url(#modalStarGradient)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" filter="url(#modalStarGlow)" />
                      </svg>
                      {/* Premium Star 5 (70% filled) */}
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <defs>
                          <clipPath id="modalHalfStarClip">
                            <rect x="0" y="0" width="12.6" height="24" />
                          </clipPath>
                        </defs>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#4a4a4a" opacity="0.6" />
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#modalStarGradient)" clipPath="url(#modalHalfStarClip)" filter="url(#modalStarGlow)" />
                      </svg>
                    </div>
                    <span className="text-sm text-foreground/80">4.7</span>
                    <span className="text-sm text-muted-foreground">|</span>
                    <span className="text-sm text-muted-foreground">38 Google recensies</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-foreground/70 transition-all hover:bg-white/10 hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Reviews List */}
            <div className="mt-4 max-h-[500px] space-y-4 overflow-y-auto">
              {googleReviews.map((review, index) => (
                <div key={index} className="flex gap-3 rounded-lg border border-white/5 bg-white/5 p-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.time}</p>
                      </div>
                      <GoogleLogo />
                    </div>
                    <div className="mt-2 flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      {review.verified && (
                        <div className="relative group ml-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#4285F4" className="cursor-help">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap border border-white/10">
                              Trustindex verifieert dat de oorspronkelijke bron van de recensie Google is.
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-foreground/80">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
