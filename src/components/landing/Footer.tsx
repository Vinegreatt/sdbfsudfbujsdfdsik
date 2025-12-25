import { Link } from "react-router-dom";
import { ExternalLink, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-8 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary p-[1px]">
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </div>
              <span className="text-xl font-bold">Reality<span className="text-gradient">VPN</span></span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">Современный VPN-сервис с управлением через Telegram.</p>
            <div className="flex gap-3">
              <a href="https://t.me/RealityVpnShop_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground transition-all">
                <span className="text-sm font-medium">Telegram Bot</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Возможности</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">Как работает</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Правовая информация</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Условия использования</Link></li>
            </ul>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RealityVPN. Все права защищены.</p>
          <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />Все системы работают</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
