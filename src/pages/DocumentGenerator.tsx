import {useState} from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import TextGeneratorTab from "@/components/generator/TextGeneratorTab";
import TemplateGeneratorTab, {TemplateFormData} from "@/components/generator/TemplateGeneratorTab";
import DocumentResult from "@/components/generator/DocumentResult";
import {Sparkles, FileText, FileCheck, Zap} from "lucide-react";
import {api} from "@/api";
import {ApiService} from "@/api/service.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {DocumentResponse} from "@/hooks/useDocument.ts";
import documentsHero from "@/assets/documents-hero.png";

const DocumentGenerator = () => {
    const [generatedDocument, setGeneratedDocument] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState("template");
    const {toast} = useToast();

    const handleTextGenerate = async (text: string) => {
        setIsGenerating(true);
        try {
            const response = await api.post<DocumentResponse>(ApiService.DOCUMENT.GENERATE_FROM_TEXT,
                {
                    text
                }, {
                    timeout: 300000
                })

            if (response.status < 400) {
                setGeneratedDocument(response.data.document_text)
                setDownloadUrl(response.data.document_path)
                toast({
                    title: "Успешно!",
                    description: "Ваш документ создан",
                });
                return;
            }

        } catch (error) {
            toast({
                title: "Возникла ошибка!",
                variant: 'destructive',
                description: error.message,
            });
        } finally {
            setIsGenerating(false);
        }
    }

    const handleTemplateGenerate = async (data: TemplateFormData) => {
        setIsGenerating(true);
        try {
            const response = await api.post<DocumentResponse>(ApiService.DOCUMENT.GENERATE,
                data, {
                    timeout: 300000
                })

            if (response.status < 400) {
                setGeneratedDocument(response.data.document_text)
                setDownloadUrl(response.data.document_path)
                toast({
                    title: "Успешно!",
                    description: "Ваш документ создан",
                });
                return;
            }

        } catch (error) {
            toast({
                title: "Возникла ошибка!",
                variant: 'destructive',
                description: error.message,
            });
        } finally {
            setIsGenerating(false);
        }
    }

    const handleRegenerate = () => {
        setGeneratedDocument("");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header/>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
                    {/* Background Illustration */}
                    <div className="absolute inset-0">
                        <img
                            src={documentsHero}
                            alt=""
                            className="w-full h-full object-cover object-center"
                            aria-hidden="true"
                        />
                        {/* Gradient overlay for text readability */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent"/>
                        <div
                            className="absolute inset-0 bg-gradient-to-tl from-background/60 via-transparent to-transparent"/>
                    </div>

                    {/* Content */}
                    <div className="container mx-auto max-w-7xl relative z-10 h-full">
                        <div className="flex items-center min-h-[400px] md:min-h-[500px] py-12">
                            <div className="max-w-xl space-y-6 animate-fade-in">
                                {/* Badge */}
                                <div
                                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                                    <FileCheck className="h-4 w-4"/>
                                    Готовые документы за минуты
                                </div>

                                {/* Heading */}
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                                        Генератор{" "}
                                        <span className="text-primary">документов</span>
                                    </h1>
                                    <p className="text-lg text-muted-foreground md:text-xl leading-relaxed max-w-md">
                                        Создайте документ для общего собрания или обращения —
                                        из текста или по готовому шаблону.
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-6 pt-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                            <FileText className="h-4 w-4 text-primary"/>
                                        </div>
                                        <span>4 типа документов</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                            <Zap className="h-4 w-4 text-primary"/>
                                        </div>
                                        <span>Мгновенная генерация</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Working Area */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Left Column - Input */}
                            <div>
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                    <TabsList className="grid w-full grid-cols-2 mb-8">
                                        <TabsTrigger value="template" className="gap-2">
                                            <FileText className="w-4 h-4"/>
                                            По шаблону
                                        </TabsTrigger>
                                        <TabsTrigger value="text" className="gap-2">
                                            <Sparkles className="w-4 h-4"/>
                                            Из текста
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="template">
                                        <TemplateGeneratorTab
                                            onGenerate={handleTemplateGenerate}
                                            isGenerating={isGenerating}
                                        />
                                    </TabsContent>

                                    <TabsContent value="text">
                                        <TextGeneratorTab
                                            onGenerate={handleTextGenerate}
                                            isGenerating={isGenerating}
                                        />
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* Right Column - Result */}
                            <div>
                                <DocumentResult
                                    document={generatedDocument}
                                    downloadUrl={downloadUrl}
                                    onRegenerate={handleRegenerate}
                                />
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-12 pt-8 border-t border-border">
                            <p className="text-sm text-muted-foreground max-w-2xl">
                                Вводимые данные не сохраняются и используются только для формирования документа
                                в рамках текущей сессии.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
};

export default DocumentGenerator;
