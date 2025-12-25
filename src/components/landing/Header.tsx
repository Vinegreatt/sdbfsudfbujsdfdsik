import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Возможности" },
    { href: "#how-it-works", label: "Как работает" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl py-3 border-b border-border/50 shadow-lg shadow-black/5" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary p-[1px] group-hover:shadow-neon transition-shadow duration-300">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center overflow-hidden">
                <img
                  src="https://s.iimg.su/s/12/gnZBtCixillEgjWEaWR9HqRg9BcgYDfur5DhCzKX.png"
                  alt="RealityVPN"
                  className="w-8 h-8 object-cover"
                />
              </div>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-foreground">Reality</span>
            <span className="text-gradient">VPN</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium rounded-lg hover:bg-muted/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
            <Link to="/auth">Войти</Link>
          </Button>
          <Button variant="hero" size="sm" className="group" asChild>
            <a
              href="https://t.me/RealityVpnShop_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Открыть бота</span>
              <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-muted/50 text-foreground"
          aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-foreground hover:text-primary transition-colors duration-200 rounded-xl hover:bg-muted/50 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border/50">
            <Button variant="glass" asChild className="w-full justify-center">
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                Войти
              </Link>
            </Button>
            <Button variant="hero" asChild className="w-full justify-center">
              <a
                href="https://t.me/RealityVpnShop_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Открыть бота
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
