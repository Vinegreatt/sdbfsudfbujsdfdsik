import { MessageCircle, CreditCard, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Откройте бота",
    description: "Перейдите в Telegram-бот @RealityVpnShop_bot и нажмите Start",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Выберите тариф",
    description: "Подберите оптимальный план и оплатите удобным способом",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Подключайтесь",
    description: "Получите конфигурацию и подключитесь за минуту",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Три простых <span className="text-gradient">шага</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Подключение занимает меньше 2 минут
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-full w-full h-[2px] bg-gradient-to-r from-border via-primary/30 to-border z-0" />
              )}

              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-glow">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground text-lg shadow-neon">
                  {step.number}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 mt-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="xl" className="group" asChild>
            <a href="https://t.me/RealityVpnShop_bot" target="_blank" rel="noopener noreferrer">
              <span>Начать сейчас</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
