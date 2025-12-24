import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-glass sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gradient">RealityVPN</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Условия использования</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Принятие условий</h2>
              <p>
                Используя сервис RealityVPN, вы соглашаетесь с настоящими условиями использования. 
                Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Описание услуги</h2>
              <p>
                RealityVPN предоставляет услуги виртуальной частной сети (VPN), которые позволяют пользователям 
                защитить свой интернет-трафик и сохранить анонимность в сети.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Допустимое использование</h2>
              <p>Вы соглашаетесь использовать сервис только в законных целях. Запрещается:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Использование сервиса для незаконной деятельности</li>
                <li>Распространение вредоносного ПО</li>
                <li>Спам и массовые рассылки</li>
                <li>Атаки на другие системы</li>
                <li>Нарушение авторских прав</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Оплата и возврат</h2>
              <p>
                Все платежи обрабатываются безопасными платёжными системами. 
                Мы предоставляем 30-дневную гарантию возврата денег для новых пользователей.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Ограничение ответственности</h2>
              <p>
                Сервис предоставляется "как есть". Мы не несём ответственности за любые убытки, 
                связанные с использованием или невозможностью использования сервиса.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Изменение условий</h2>
              <p>
                Мы оставляем за собой право изменять эти условия в любое время. 
                Продолжая использовать сервис после изменений, вы принимаете обновлённые условия.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Контакты</h2>
              <p>
                По вопросам условий использования обращайтесь: legal@realityvpn.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
