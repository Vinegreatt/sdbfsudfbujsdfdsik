import { useState, useEffect } from "react";
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

interface UserData {
  id: string;
  telegram_id: number;
  username: string;
  first_name: string;
  last_name: string;
  photo_url: string | null;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("vpn_user");
    const session = localStorage.getItem("vpn_session");
    
    if (!storedUser || !session) {
      navigate("/auth");
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vpn_user");
    localStorage.removeItem("vpn_session");
    toast({
      title: "Выход выполнен",
      description: "До скорой встречи!",
    });
    navigate("/");
  };

  const copyKey = () => {
    navigator.clipboard.writeText("vless://demo-key-12345@server.realityvpn.com:443");
    setCopied(true);
    toast({
      title: "Скопировано",
      description: "Ключ скопирован в буфер обмена",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const mockSubscription = {
    plan: "Полгода",
    status: "active",
    startAt: "2024-01-15",
    endAt: "2024-07-15",
    daysLeft: 180,
  };

  const mockPayments = [
    { id: 1, date: "2024-01-15", amount: 25, currency: "EUR", status: "completed", plan: "Полгода" },
    { id: 2, date: "2023-07-10", amount: 5, currency: "EUR", status: "completed", plan: "Месяц" },
  ];

  const devices = [
    { name: "iOS", icon: Smartphone, instructions: "Скачайте Shadowrocket или V2rayNG" },
    { name: "Android", icon: Smartphone, instructions: "Скачайте V2rayNG из Play Store" },
    { name: "Windows", icon: Monitor, instructions: "Используйте Nekoray или V2rayN" },
    { name: "macOS", icon: Laptop, instructions: "Скачайте V2rayU или Nekoray" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
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
              <span>{user.first_name} {user.last_name}</span>
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
                      mockSubscription.status === "active" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {mockSubscription.status === "active" ? "Активна" : "Неактивна"}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Текущий план</p>
                      <p className="text-lg font-semibold text-gradient">{mockSubscription.plan}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Действует до</p>
                      <p className="text-lg font-semibold">{mockSubscription.endAt}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Осталось дней</p>
                      <p className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        {mockSubscription.daysLeft}
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
                      <p className="text-sm font-medium">Ваш ключ подключения</p>
                      <Button variant="ghost" size="sm" onClick={copyKey}>
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <code className="block text-sm text-muted-foreground font-mono bg-background/50 p-3 rounded-lg overflow-x-auto">
                      vless://demo-key-12345@server.realityvpn.com:443
                    </code>
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
                      <p className="text-sm font-medium">VLESS ключ</p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={copyKey}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span className="ml-1">Копировать</span>
                        </Button>
                      </div>
                    </div>
                    <code className="block text-sm text-muted-foreground font-mono bg-background/50 p-3 rounded-lg overflow-x-auto break-all">
                      vless://demo-key-12345@server.realityvpn.com:443?encryption=none&security=reality&sni=www.google.com
                    </code>
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
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">План</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Сумма</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPayments.map((payment) => (
                        <tr key={payment.id} className="border-b border-border/50">
                          <td className="py-4 px-4 text-sm">{payment.date}</td>
                          <td className="py-4 px-4 text-sm">{payment.plan}</td>
                          <td className="py-4 px-4 text-sm font-medium">
                            €{payment.amount}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              payment.status === "completed"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                              {payment.status === "completed" ? "Оплачен" : "В обработке"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {mockPayments.length === 0 && (
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
                    {user.first_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user.first_name} {user.last_name}</h3>
                    <p className="text-muted-foreground">@{user.username}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Telegram ID</p>
                    <p className="font-mono">{user.telegram_id}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Username</p>
                    <p>@{user.username}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Имя</p>
                    <p>{user.first_name} {user.last_name}</p>
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
