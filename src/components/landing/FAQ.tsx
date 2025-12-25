import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "Как начать пользоваться RealityVPN?",
    answer: "Перейдите в наш Telegram-бот @RealityVpnShop_bot, выберите тарифный план и получите конфигурацию. Подключение занимает менее 2 минут.",
  },
  {
    question: "Какие устройства поддерживаются?",
    answer: "RealityVPN работает на iOS, Android, Windows, macOS и Linux. Одна подписка позволяет подключить несколько устройств.",
  },
  {
    question: "Вы храните логи активности?",
    answer: "Нет. Мы придерживаемся строгой политики No-Logs — не храним и не отслеживаем вашу онлайн-активность.",
  },
  {
    question: "Какие способы оплаты доступны?",
    answer: "Принимаем карты, криптовалюту и другие способы оплаты через проверенных провайдеров.",
  },
  {
    question: "Как связаться с поддержкой?",
    answer: "Напишите нам @RealityVPNadmin в Telegram — мы на связи 24/7.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-border/50 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Частые <span className="text-gradient">вопросы</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-2xl px-6 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 data-[state=open]:border-primary/50 data-[state=open]:shadow-glow"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-5 hover:no-underline hover:text-primary transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
