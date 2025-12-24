import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type TelegramUser = {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
  }
}

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const navigate = useNavigate();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const botUsername = import.meta.env.VITE_TELEGRAM_LOGIN_BOT_USERNAME as string | undefined;

    if (!botUsername || !widgetRef.current) {
      return;
    }

    window.onTelegramAuth = async (user: TelegramUser) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/telegram/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.detail || "Не удалось выполнить вход");
        }

        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в RealityVPN!",
        });

        navigate("/dashboard");
      } catch (error) {
        toast({
          title: "Ошибка входа",
          description: error instanceof Error ? error.message : "Попробуйте позже",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    widgetRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.onload = () => setWidgetReady(true);
    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
      window.onTelegramAuth = undefined;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          {/* Auth Card */}
          <div className="p-8 rounded-2xl bg-glass border border-border animate-scale-in">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-4 shadow-neon">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">
                Войти в <span className="text-gradient">RealityVPN</span>
              </h1>
              <p className="text-muted-foreground">
                Используйте Telegram для быстрого входа
              </p>
            </div>

            {/* Telegram Login Button */}
            <div className="w-full mb-6 flex justify-center">
              <div ref={widgetRef} />
            </div>
            {!widgetReady && (
              <Button variant="telegram" size="xl" className="w-full mb-6" disabled>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Загрузка Telegram Login...
              </Button>
            )}
            {isLoading && (
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Авторизация через Telegram...
              </div>
            )}

            {/* Info */}
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-4">
                Нажимая кнопку входа, вы соглашаетесь с{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  условиями использования
                </Link>{" "}
                и{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  политикой конфиденциальности
                </Link>
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm font-medium mb-4 text-center">Почему Telegram?</p>
              <ul className="space-y-3">
                {[
                  "Быстрый вход без паролей",
                  "Защита через двухфакторную аутентификацию",
                  "Уведомления о входе в аккаунт",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Demo Notice */}
          {!import.meta.env.VITE_TELEGRAM_LOGIN_BOT_USERNAME && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Укажите VITE_TELEGRAM_LOGIN_BOT_USERNAME, чтобы отобразить кнопку входа
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
