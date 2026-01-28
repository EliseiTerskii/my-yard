import {useState} from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import TextGeneratorTab from "@/components/generator/TextGeneratorTab";
import TemplateGeneratorTab, {TemplateFormData} from "@/components/generator/TemplateGeneratorTab";
import DocumentResult from "@/components/generator/DocumentResult";
import {Sparkles, FileText} from "lucide-react";
import {api} from "@/api";
import {ApiService} from "@/api/service.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {DocumentResponse} from "@/hooks/useDocument.ts";

const DocumentGenerator = () => {
    const [generatedDocument, setGeneratedDocument] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState("template");
    const { toast } = useToast();

    const handleTextGenerate = async (text: string) => {
        setIsGenerating(true);
        try {
            const response = await api.post<DocumentResponse>(ApiService.DOCUMENT.GENERATE_FROM_TEXT,
                text, {
                    timeout: 300000
                })

            if (response.status < 400) {
                setGeneratedDocument(response.data.aiResponse)
                setDownloadUrl(response.data.downloadUrl)
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
                setGeneratedDocument(response.data.aiResponse)
                setDownloadUrl(response.data.downloadUrl)
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
                {/* Intro Section */}
                <section className="py-12 md:py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Генератор документов
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Создайте документ для общего собрания или обращения — из текста или по шаблону
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Working Area */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
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
