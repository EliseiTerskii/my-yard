import {useState} from "react";
import {Link} from "react-router-dom";
import {Menu, X, Home} from "lucide-react";
import {Button} from "@/components/ui/button";

const navItems = [
    {label: "Лекторий", href: "/lectorium"},
    {label: "Мероприятия", href: "/events"},
    {label: "Генератор документов", href: "/documents"},
    {label: "Юридическая база", href: "/legal"},
    {label: "Памятка", href: "/memo"},
    {label: "Контакты", href: "/contacts"},
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 ">
            <div className="container mx-auto max-w-7xl">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <Home className="h-5 w-5 text-primary-foreground"/>
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-foreground">
                            Мой Двор
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                    >
                        {isMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t bg-background lg:hidden">
                    <nav className="container flex flex-col py-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
