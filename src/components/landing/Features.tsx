import { Zap, Shield, Eye, Globe, Server, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Стабильное соединение",
    description: "Оптимизированные маршруты для повседневной работы, стриминга и звонков.",
  },
  {
    icon: Shield,
    title: "Надёжное шифрование",
    description: "Передача данных защищена современными криптографическими протоколами.",
  },
  {
    icon: Eye,
    title: "Прозрачный подход к данным",
    description: "Минимизируем сбор технической информации и используем её только для работы сервиса.",
  },
  {
    icon: Globe,
    title: "География подключений",
    description: "Выбирайте удобные локации в зависимости от ваших задач и времени суток.",
  },
  {
    icon: Server,
    title: "Гибкие настройки",
    description: "Профили и конфигурации для разных устройств и сценариев.",
  },
  {
    icon: Clock,
    title: "Поддержка в Telegram",
    description: "Помогаем с подключением и вопросами через чат поддержки.",
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
            Коротко о том, что важно для ежедневного использования сервиса.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-glass border border-border/70 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
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
