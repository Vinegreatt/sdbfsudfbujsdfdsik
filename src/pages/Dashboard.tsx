import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, Clock, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TelegramData {
  id: number;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  photo_url?: string | null;
}

interface SubscriptionData {
  blocked: boolean;
  deleted: boolean;
  is_tarif: boolean;
  end_date: string | null;
  type: string | null;
  device_limit_expires_at: string | null;
  auto_payment_enabled: boolean;
}

interface MeResponse {
  telegram: TelegramData;
  subscription: SubscriptionData;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/me", { credentials: "include" });
        if (response.status === 401) {
          toast({
            title: "Нужна авторизация",
            description: "Пожалуйста, войдите через Telegram.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }
        if (response.status === 403) {
          const data = await response.json().catch(() => ({}));
          toast({
            title: "Доступ ограничен",
            description: data.detail || "Аккаунт заблокирован или удалён.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.detail || "Не удалось загрузить профиль");
        }
        const data: MeResponse = await response.json();
        setProfile(data);
      } catch (error) {
        toast({
          title: "Ошибка загрузки",
          description: error instanceof Error ? error.message : "Попробуйте позже",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => null);
    toast({
      title: "Выход выполнен",
      description: "До скорой встречи!",
    });
    navigate("/");
  };

  const parseDate = (value?: string | null) => {
    if (!value) return null;
    const normalized = value.includes("T") ? value : value.replace(" ", "T");
    const date = new Date(normalized);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const subscriptionEnd = useMemo(
    () => parseDate(profile?.subscription.end_date),
    [profile?.subscription.end_date],
  );
  const subscriptionActive = subscriptionEnd ? subscriptionEnd.getTime() > Date.now() : false;
  const subscriptionEndMsk = subscriptionEnd
    ? subscriptionEnd.toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const subscriptionDaysLeft = subscriptionEnd
    ? Math.max(0, Math.ceil((subscriptionEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Не удалось загрузить данные</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-glass sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://s.iimg.su/s/12/gnZBtCixillEgjWEaWR9HqRg9BcgYDfur5DhCzKX.png"
              alt="RealityVPN"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-gradient">RealityVPN</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{profile.telegram.first_name} {profile.telegram.last_name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-glass border border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Статус подписки</h2>
                  <p className="text-muted-foreground">Управление подпиской доступно в боте</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  subscriptionActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}>
                  {subscriptionActive ? "Активна" : "Неактивна"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Текущий план</p>
                  <p className="text-lg font-semibold text-gradient">
                    {profile.subscription.type || "Не задан"}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Действует до</p>
                  <p className="text-lg font-semibold">
                    {subscriptionEndMsk || "Нет данных"}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Осталось дней</p>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {subscriptionDaysLeft ?? "—"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <a
                    href="https://t.me/RealityVpnShop_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Открыть бота для управления подпиской
                  </a>
                </Button>
              </div>
            </div>
          </main>

          <aside className="lg:col-span-1">
            <div className="p-4 rounded-xl bg-glass border border-border">
              <h4 className="font-medium mb-2">Нужна помощь?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Напишите в поддержку в Telegram
              </p>
              <a
                href="https://t.me/RealityVPNadmin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Написать в Telegram
                </Button>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
