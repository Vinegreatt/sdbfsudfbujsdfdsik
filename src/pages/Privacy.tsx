import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const Privacy = () => {
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
          <h1 className="text-4xl font-bold mb-8">Политика конфиденциальности</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Введение</h2>
              <p>
                RealityVPN ("мы", "наш" или "сервис") уважает вашу конфиденциальность и стремится защитить ваши персональные данные. 
                Эта политика конфиденциальности объясняет, как мы собираем, используем и защищаем вашу информацию.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Политика No-Logs</h2>
              <p>
                Мы придерживаемся строгой политики отсутствия логов (No-Logs). Это означает:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Мы не записываем вашу активность в интернете</li>
                <li>Мы не храним IP-адреса подключений</li>
                <li>Мы не отслеживаем посещаемые вами сайты</li>
                <li>Мы не записываем временные метки подключений</li>
                <li>Мы не храним объём переданных данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Какие данные мы собираем</h2>
              <p>Для работы сервиса мы собираем минимально необходимую информацию:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Telegram ID и базовые данные профиля (имя пользователя, фото)</li>
                <li>Email для связи (опционально)</li>
                <li>Информация о платежах (без полных данных карты)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Как мы используем данные</h2>
              <p>Собранные данные используются исключительно для:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Предоставления VPN-услуг</li>
                <li>Обработки платежей</li>
                <li>Технической поддержки</li>
                <li>Улучшения качества сервиса</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Защита данных</h2>
              <p>
                Мы используем современные методы защиты данных, включая шифрование при передаче и хранении. 
                Доступ к данным имеет только ограниченный круг сотрудников.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Контакты</h2>
              <p>
                По вопросам конфиденциальности обращайтесь: privacy@realityvpn.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
