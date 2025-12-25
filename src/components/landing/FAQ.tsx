import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Как работает RealityVPN?",
    answer: "Сервис создаёт защищённое соединение между устройством и сервером. Это помогает безопасно передавать данные и получать доступ к нужным ресурсам.",
  },
  {
    question: "Где оформляется подписка и продление?",
    answer: "Все действия с подпиской выполняются в Telegram-боте RealityVPN. На сайте нет оплаты и выбора тарифов.",
  },
  {
    question: "Как получить конфигурацию?",
    answer: "Бот выдаёт конфигурацию и краткую инструкцию. Обычно это занимает пару минут.",
  },
  {
    question: "Какие устройства поддерживаются?",
    answer: "Поддерживаются популярные платформы: iOS, Android, Windows, macOS и Linux. Конфигурации выдаются в боте.",
  },
  {
    question: "Куда обращаться за поддержкой?",
    answer: "Напишите в поддержку: t.me/RealityVPNadmin. Мы отвечаем в Telegram.",
  },
  {
    question: "Что делать, если конфигурация не подключается?",
    answer: "Проверьте, что вы импортировали актуальный файл, и обратитесь в поддержку — подскажем и проверим настройки.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Часто задаваемые <span className="text-gradient">вопросы</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Короткие ответы на основные вопросы.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-glass border border-border/70 rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors shadow-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
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
