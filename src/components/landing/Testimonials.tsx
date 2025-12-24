import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Александр М.",
    role: "Фрилансер",
    content: "Пользуюсь уже полгода — ни разу не подвёл. Скорость отличная, работает на всех устройствах.",
    rating: 5,
  },
  {
    name: "Мария К.",
    role: "Маркетолог",
    content: "Наконец-то нашла VPN, который не тормозит. Подключение через Telegram — это гениально!",
    rating: 5,
  },
  {
    name: "Дмитрий В.",
    role: "Разработчик",
    content: "Техническая реализация на высоте. Быстрые серверы, понятный интерфейс, адекватная поддержка.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Что говорят <span className="text-gradient">пользователи</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Тысячи пользователей уже доверяют нам свою безопасность в сети
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-glass border border-border/70 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                <p className="text-muted-foreground pl-4">{testimonial.content}</p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
