import { MessageSquare, FileText, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Откройте бота",
    description: "Вся регистрация и управление подпиской происходят в Telegram.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Получите инструкции",
    description: "Бот выдаст конфигурацию и короткую инструкцию для вашего устройства.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Подключитесь",
    description: "Импортируйте конфигурацию и начните использовать VPN.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Как <span className="text-gradient">начать</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Пара шагов — и можно подключаться.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-secondary/50" />
              )}
              
              <div className="text-center relative z-10">
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-glass border border-border/70 flex items-center justify-center group hover:border-primary/50 transition-all duration-300 hover:shadow-card">
                    <item.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
