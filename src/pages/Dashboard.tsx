import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  User, 
  CreditCard, 
  Settings, 
  LogOut, 
  Download,
  Copy,
  Check,
  Clock,
  Smartphone,
  Monitor,
  Laptop,
  Send,
  ChevronRight,
  Zap
} from "lucide-react";
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

interface ConnectionData {
  url: string | null;
  short_id: string | null;
}

interface PaymentData {
  amount: number;
  status: string;
  created_at: string;
  processed_at?: string | null;
  duration?: number | null;
  device_count?: number | null;
  subscription_type?: string | null;
  payment_id?: string | number | null;
}

interface MeResponse {
  telegram: TelegramData;
  connection: ConnectionData;
  subscription: SubscriptionData;
  payments: PaymentData[];
}

const Dashboard = () => {
  const [profile, setProfile] = useState<MeResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
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

  const copyKey = () => {
    if (!profile?.connection.url) {
      return;
    }
    navigator.clipboard.writeText(profile.connection.url);
    setCopied(true);
    toast({
      title: "Скопировано",
      description: "Ссылка подключения скопирована в буфер обмена",
    });
    setTimeout(() => setCopied(false), 2000);
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

  const devices = [
    { name: "iOS", icon: Smartphone, instructions: "Скачайте Shadowrocket или V2rayNG" },
    { name: "Android", icon: Smartphone, instructions: "Скачайте V2rayNG из Play Store" },
    { name: "Windows", icon: Monitor, instructions: "Используйте Nekoray или V2rayN" },
    { name: "macOS", icon: Laptop, instructions: "Скачайте V2rayU или Nekoray" },
  ];

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

  const tabs = [
    { id: "overview", label: "Обзор", icon: Shield },
    { id: "access", label: "Доступ", icon: Settings },
    { id: "payments", label: "Платежи", icon: CreditCard },
    { id: "profile", label: "Профиль", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-glass sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Support Card */}
            <div className="mt-6 p-4 rounded-xl bg-glass border border-border">
              <h4 className="font-medium mb-2">Нужна помощь?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Наша поддержка доступна 24/7
              </p>
              <a
                href="https://t.me/realityvpn_support"
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

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <>
                {/* Subscription Status */}
                <div className="p-6 rounded-2xl bg-glass border border-border">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">Статус подписки</h2>
                      <p className="text-muted-foreground">Управляйте вашим планом</p>
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

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button variant="hero" className="flex-1">
                      <Zap className="w-4 h-4 mr-2" />
                      Продлить подписку
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Изменить план
                    </Button>
                  </div>
                </div>

                {/* Quick Access */}
                <div className="p-6 rounded-2xl bg-glass border border-border">
                  <h2 className="text-xl font-semibold mb-4">Быстрый доступ</h2>
                  
                  <div className="p-4 rounded-xl bg-muted/50 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium">Подключение</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyKey}
                        disabled={!profile.connection.url}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    {profile.connection.url ? (
                      <a
                        href={profile.connection.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-primary font-mono bg-background/50 p-3 rounded-lg break-all hover:underline"
                      >
                        {profile.connection.url}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-lg">
                        Подписка не найдена, обратитесь в поддержку
                      </p>
                    )}
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать конфигурацию
                  </Button>
                </div>
              </>
            )}

            {/* Access Tab */}
            {activeTab === "access" && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-glass border border-border">
                  <h2 className="text-xl font-semibold mb-4">Инструкции по подключению</h2>
                  <p className="text-muted-foreground mb-6">
                    Выберите вашу платформу для получения инструкций
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {devices.map((device, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                            <device.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium mb-1">{device.name}</p>
                            <p className="text-sm text-muted-foreground">{device.instructions}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-glass border border-border">
                  <h2 className="text-xl font-semibold mb-4">Ваш ключ</h2>
                  
                  <div className="p-4 rounded-xl bg-muted/50 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium">Ссылка подключения</p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={copyKey} disabled={!profile.connection.url}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span className="ml-1">Копировать</span>
                        </Button>
                      </div>
                    </div>
                    {profile.connection.url ? (
                      <a
                        href={profile.connection.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-primary font-mono bg-background/50 p-3 rounded-lg break-all hover:underline"
                      >
                        {profile.connection.url}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-lg">
                        Подписка не найдена, обратитесь в поддержку
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Скачать .conf
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Показать QR-код
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="p-6 rounded-2xl bg-glass border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">История платежей</h2>
                  <Button variant="hero" size="sm">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Оплатить
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Дата</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Тип</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Сумма</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.payments.map((payment) => {
                        const createdAt = parseDate(payment.created_at);
                        const createdLabel = createdAt
                          ? createdAt.toLocaleDateString("ru-RU")
                          : payment.created_at;
                        return (
                          <tr
                            key={payment.payment_id ?? `${payment.created_at}-${payment.amount}`}
                            className="border-b border-border/50"
                          >
                            <td className="py-4 px-4 text-sm">{createdLabel}</td>
                            <td className="py-4 px-4 text-sm">
                              {payment.subscription_type || "—"}
                            </td>
                            <td className="py-4 px-4 text-sm font-medium">{payment.amount}</td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                payment.status === "completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}>
                                {payment.status === "completed" ? "Оплачен" : payment.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {profile.payments.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>История платежей пуста</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="p-6 rounded-2xl bg-glass border border-border">
                <h2 className="text-xl font-semibold mb-6">Профиль</h2>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground">
                    {(profile.telegram.first_name || "П").charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {profile.telegram.first_name} {profile.telegram.last_name}
                    </h3>
                    <p className="text-muted-foreground">
                      {profile.telegram.username ? `@${profile.telegram.username}` : "Без username"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Telegram ID</p>
                    <p className="font-mono">{profile.telegram.id}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Username</p>
                    <p>{profile.telegram.username ? `@${profile.telegram.username}` : "—"}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Имя</p>
                    <p>{profile.telegram.first_name} {profile.telegram.last_name}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти из аккаунта
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
