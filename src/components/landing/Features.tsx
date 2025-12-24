import { Zap, Shield, Eye, Globe, Server, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Молниеносная скорость",
    description: "До 10 Гбит/с без ограничений. Стриминг, игры и загрузки на максимальной скорости.",
  },
  {
    icon: Shield,
    title: "Военное шифрование",
    description: "AES-256 шифрование банковского уровня защищает все ваши данные.",
  },
  {
    icon: Eye,
    title: "Строгая политика No-Logs",
    description: "Мы не храним никаких логов вашей активности. Полная анонимность гарантирована.",
  },
  {
    icon: Globe,
    title: "50+ локаций",
    description: "Серверы по всему миру для стабильного и быстрого соединения из любой точки.",
  },
  {
    icon: Server,
    title: "Безлимитный трафик",
    description: "Никаких ограничений по объёму данных. Используйте столько, сколько нужно.",
  },
  {
    icon: Clock,
    title: "24/7 Поддержка",
    description: "Техническая поддержка через Telegram в любое время дня и ночи.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Почему выбирают <span className="text-gradient">RealityVPN</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы создали VPN-сервис, который сочетает в себе скорость, безопасность и простоту использования
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-glass border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-neon"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
