import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-xl text-center px-6">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-neon">
          <Shield className="h-8 w-8 text-primary-foreground" />
        </div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">RealityVPN</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Страница не найдена</h1>
        <p className="text-muted-foreground mb-8">
          Похоже, такой страницы нет или она была перемещена. Проверьте адрес или вернитесь на главную.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="hero" asChild>
            <Link to="/">Вернуться на главную</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/#pricing">Смотреть тарифы</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
