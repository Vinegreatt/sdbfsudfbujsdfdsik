import { Zap, Shield, Eye, Globe, Server, Clock, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Высокая скорость",
    description: "Оптимизированные сервера для стриминга, игр и видеозвонков без задержек.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Shield,
    title: "Военное шифрование",
    description: "AES-256 и современные протоколы защищают ваши данные на всех устройствах.",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Eye,
    title: "Политика No-Logs",
    description: "Мы не храним логи активности. Ваша приватность — наш приоритет.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Globe,
    title: "Глобальная сеть",
    description: "Серверы в 10+ странах для доступа к контенту со всего мира.",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Server,
    title: "Все устройства",
    description: "Поддержка iOS, Android, Windows, macOS и Linux из одной подписки.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Clock,
    title: "24/7 Поддержка",
    description: "Быстрая помощь через Telegram-бот в любое время суток.",
    gradient: "from-secondary/20 to-secondary/5",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-border/50 mb-6 animate-fade-up opacity-0"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <span className="text-sm text-primary font-medium">Возможности</span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Почему выбирают{' '}
            <span className="text-gradient">RealityVPN</span>
          </h2>
          <p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up opacity-0"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            Современные технологии для вашей безопасности и свободы в интернете
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-glass border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 animate-fade-up opacity-0"
              style={{ 
                animationDelay: `${0.4 + index * 0.1}s`, 
                animationFillMode: 'forwards' 
              }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="relative mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                <span className="text-sm font-medium">Подробнее</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
