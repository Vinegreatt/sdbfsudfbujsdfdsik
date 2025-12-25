import { Link } from "react-router-dom";
import { Send, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="https://s.iimg.su/s/12/gnZBtCixillEgjWEaWR9HqRg9BcgYDfur5DhCzKX.png"
                alt="RealityVPN"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-gradient">RealityVPN</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              VPN-сервис с управлением через Telegram-бота.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/RealityVpnShop_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-glass border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <Send className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="https://t.me/RealityVPNadmin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-glass border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Продукт</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Преимущества
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Как подключиться
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://t.me/RealityVpnShop_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Telegram-бот
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/RealityVPNadmin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Поддержка в Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Документы</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RealityVPN. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground">
            Информация на сайте носит справочный характер.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
