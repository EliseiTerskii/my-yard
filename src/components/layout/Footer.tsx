import { Link } from "react-router-dom";
import {Home, Mail, Send} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12 mx-auto max-w-7xl">
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
                href="mailto:genezis.fond@BK.ru"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                genezis.fond@BK.ru
              </a>
              <a
                  href="mailto:genesis.kostyaeva.uylua@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                genesis.kostyaeva.uylua@gmail.com
              </a>
              <a 
                href="https://t.me/+79854415175"
                target="_blank"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="h-4 w-4" />
                +7 (985) 441-51-75
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Мой Двор. Образовательный проект.
          </p>
          <div className="flex gap-6">
            <Link to="/policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
