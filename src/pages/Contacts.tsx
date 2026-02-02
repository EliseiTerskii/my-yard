import {Mail, Phone, MessageCircle, Send, Home} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {Card, CardContent} from "@/components/ui/card";
import {useToast} from "@/hooks/use-toast.ts";

const contactItems = [
    {
        icon: Home,
        label: "Юридический адрес",
        value: "119180, город Москва, ул. Большая Полянка, д. 51а/9, этаж/помещ. 8/I, ком./офис 1/взу",
        href: "copy",
    },
    {
        icon: Send,
        label: "Telegram",
        value: "+7 (985) 441-51-75",
        href: "https://t.me/+79854415175",
    },
    {
        icon: Mail,
        label: "Email",
        value: "genezis.fond@BK.ru",
        href: "mailto:genezis.fond@BK.ru",
    },
    {
        icon: Mail,
        label: "Email",
        value: "genesis.kostyaeva.uylua@gmail.com",
        href: "mailto:genesis.kostyaeva.uylua@gmail.com",
    },
];

const Contacts = () => {
    const {toast} = useToast();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header/>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-muted/30 py-12 md:py-16">
                    <div className="container mx-auto">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Контакты
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Если у вас есть вопросы или предложения — свяжитесь с нами
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contacts Grid */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto">
                        <div className="max-w-3xl mx-auto">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {contactItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href === 'copy' ? '#' : item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="block"
                                        onClick={async () => {
                                            if (item.href === 'copy') {try {
                                                await navigator.clipboard.writeText(item.value);
                                                toast({
                                                    title: "Скопировано",
                                                    description: "Адрес скопирован в буфер обмена",
                                                });
                                            } catch {
                                                toast({
                                                    title: "Ошибка",
                                                    description: "Не удалось скопировать адрес",
                                                    variant: "destructive",
                                                });
                                            }
                                        }}}
                                    >
                                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                        <item.icon className="w-6 h-6 text-primary"/>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mb-1">
                                                            {item.label}
                                                        </p>
                                                        <p className="font-medium text-foreground">
                                                            {item.value}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </a>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-12 text-center">
                                <p className="text-muted-foreground">
                                    Мы стараемся отвечать на все обращения в течение 24 часов
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
};

export default Contacts;
