import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-orb-1" />
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-orb-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-glass border border-border/50 mb-10 animate-fade-up opacity-0"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <span className="flex items-center justify-center w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">
              Telegram-бот для быстрого подключения
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight animate-fade-up opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <span className="block text-foreground">Интернет без</span>
            <span className="text-gradient glow-text">ограничений</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            Современный VPN-сервис с управлением через Telegram. 
            Подключение за 2 минуты, без сложных настроек.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-up opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full sm:w-auto group relative overflow-hidden"
              asChild
            >
              <a
                href="https://t.me/RealityVpnShop_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Начать бесплатно
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </Button>
            <Button 
              variant="glass" 
              size="xl" 
              className="w-full sm:w-auto"
              asChild
            >
              <a
                href="#features"
              >
                Узнать больше
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-up opacity-0"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">AES-256</span>
              </div>
              <span className="text-sm text-muted-foreground">Шифрование</span>
            </div>
            <div className="text-center border-x border-border/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">99.9%</span>
              </div>
              <span className="text-sm text-muted-foreground">Uptime</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">10+</span>
              </div>
              <span className="text-sm text-muted-foreground">Локаций</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="absolute left-[10%] top-1/3 hidden xl:block animate-float">
        <div className="w-20 h-20 rounded-2xl bg-glass-strong flex items-center justify-center shadow-glow border-glow">
          <Shield className="w-10 h-10 text-primary" />
        </div>
      </div>
      <div className="absolute right-[10%] top-1/2 hidden xl:block animate-float-delayed">
        <div className="w-16 h-16 rounded-2xl bg-glass-strong flex items-center justify-center shadow-neon-purple border-glow">
          <Zap className="w-8 h-8 text-secondary" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
