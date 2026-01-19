import { Link } from "react-router-dom";
import { Home, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">Мой Двор</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Образовательная платформа для жителей многоквартирных домов. 
              Помогаем разбираться в ЖКХ и защищать свои права.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Разделы</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/lectorium" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Лекторий
              </Link>
              <Link to="/documents" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Генератор документов
              </Link>
              <Link to="/legal" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Юридическая база
              </Link>
              <Link to="/memo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Памятка активного жителя
              </Link>
            </nav>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Контакты</h3>
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:info@moydvor.ru" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@moydvor.ru
              </a>
              <a 
                href="tel:+78001234567" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                8 (800) 123-45-67
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Мой Двор. Образовательный проект.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
