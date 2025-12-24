import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Как работает RealityVPN?",
    answer: "RealityVPN создаёт зашифрованный туннель между вашим устройством и нашими серверами. Весь ваш трафик проходит через этот туннель, защищая данные от перехвата и скрывая ваш реальный IP-адрес.",
  },
  {
    question: "Какие протоколы поддерживаются?",
    answer: "Мы поддерживаем современные протоколы: WireGuard, VLESS с Reality, а также OpenVPN для совместимости со старыми устройствами. WireGuard обеспечивает максимальную скорость, а Reality — лучший обход блокировок.",
  },
  {
    question: "Можно ли использовать на нескольких устройствах?",
    answer: "Да! В зависимости от тарифа вы можете подключить от 5 до неограниченного количества устройств одновременно. iOS, Android, Windows, macOS, Linux — все платформы поддерживаются.",
  },
  {
    question: "Храните ли вы логи активности?",
    answer: "Нет. Мы придерживаемся строгой политики No-Logs. Мы не записываем, не отслеживаем и не храним никакой информации о вашей онлайн-активности.",
  },
  {
    question: "Как происходит оплата?",
    answer: "Мы принимаем банковские карты, криптовалюту и другие способы оплаты. Все платежи защищены и обрабатываются через проверенных партнёров.",
  },
  {
    question: "Есть ли гарантия возврата денег?",
    answer: "Да, мы предоставляем 30-дневную гарантию возврата средств. Если вы не удовлетворены сервисом, мы вернём деньги без лишних вопросов.",
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
            Ответы на популярные вопросы о нашем сервисе
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
