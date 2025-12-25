import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Lock } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-border mb-8 animate-fade-up">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Подключение и управление через Telegram-бота</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Доступ к VPN
            <br />
            <span className="text-gradient glow-text">без лишних шагов</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            RealityVPN — сервис VPN-доступа. Оформление подписки,
            продление и получение инструкций выполняются в Telegram-боте.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" className="w-full sm:w-auto" asChild>
              <a
                href="https://t.me/RealityVpnShop_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть бота
              </a>
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto" asChild>
              <a
                href="https://t.me/RealityVPNadmin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Связаться с поддержкой
              </a>
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-10 top-1/3 hidden lg:block animate-float">
          <div className="w-16 h-16 rounded-2xl bg-glass flex items-center justify-center shadow-neon">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="absolute right-10 top-1/2 hidden lg:block animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-14 h-14 rounded-2xl bg-glass flex items-center justify-center shadow-neon">
            <MessageCircle className="w-7 h-7 text-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
