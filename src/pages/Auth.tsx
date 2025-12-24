import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Send, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTelegramLogin = async () => {
    setIsLoading(true);
    
    // Симуляция входа через Telegram (в реальности здесь будет Telegram Login Widget)
    // Для демонстрации создаём мок-пользователя
    setTimeout(() => {
      const mockUser = {
        id: "mock-user-id",
        telegram_id: 123456789,
        username: "demo_user",
        first_name: "Демо",
        last_name: "Пользователь",
        photo_url: null,
      };
      
      localStorage.setItem("vpn_user", JSON.stringify(mockUser));
      localStorage.setItem("vpn_session", "demo-session-token");
      
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в RealityVPN!",
      });
      
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

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
            <Button
              variant="telegram"
              size="xl"
              className="w-full mb-6"
              onClick={handleTelegramLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Send className="w-5 h-5 mr-2" />
              )}
              {isLoading ? "Подключение..." : "Войти через Telegram"}
            </Button>

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
          <p className="text-center text-sm text-muted-foreground mt-6">
            Демо-режим: нажмите кнопку для входа с тестовым аккаунтом
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
