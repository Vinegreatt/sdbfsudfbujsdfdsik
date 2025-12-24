import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Месяц",
    price: "5",
    period: "/мес",
    description: "Попробуйте все возможности",
    features: [
      "Безлимитный трафик",
      "Все серверы",
      "5 устройств",
      "Поддержка 24/7",
    ],
    popular: false,
  },
  {
    name: "Полгода",
    price: "25",
    period: "/6 мес",
    pricePerMonth: "4.17",
    description: "Экономия 17%",
    features: [
      "Безлимитный трафик",
      "Все серверы",
      "10 устройств",
      "Приоритетная поддержка",
      "Выделенный IP",
    ],
    popular: true,
  },
  {
    name: "Год",
    price: "45",
    period: "/год",
    pricePerMonth: "3.75",
    description: "Максимальная экономия",
    features: [
      "Безлимитный трафик",
      "Все серверы",
      "Безлимитные устройства",
      "VIP поддержка",
      "Выделенный IP",
      "Ранний доступ к функциям",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Простые и <span className="text-gradient">прозрачные</span> цены
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Выберите подходящий тариф. Все планы включают полный доступ к сервису.
          </p>
          <p className="text-sm text-muted-foreground mt-2">(примерные цены)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl ${
                plan.popular
                  ? "bg-gradient-to-b from-primary/10 to-secondary/10 border-2 border-primary shadow-neon-lg"
                  : "bg-glass border border-border/70 shadow-card"
              } transition-all duration-300 hover:-translate-y-1`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary-foreground" />
                  <span className="text-sm font-semibold text-primary-foreground">Популярный</span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gradient">€{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                {plan.pricePerMonth && (
                  <p className="text-sm text-muted-foreground mt-1">
                    €{plan.pricePerMonth}/мес
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                onClick={() => navigate("/auth")}
              >
                Выбрать тариф
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
