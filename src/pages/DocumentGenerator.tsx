import { useState } from "react";
import { FileText, Copy, Download, RefreshCw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const templates = [
  {
    id: "notification",
    label: "Уведомление о проведении ОСС",
    prompt: "Нужно уведомление о проведении общего собрания собственников для дома по адресу…",
  },
  {
    id: "agenda",
    label: "Повестка ОСС",
    prompt: "Нужна повестка общего собрания собственников с вопросами о…",
  },
  {
    id: "protocol",
    label: "Протокол ОСС (шаблон)",
    prompt: "Нужен шаблон протокола общего собрания собственников для оформления решений по…",
  },
  {
    id: "requirement",
    label: "Требование в УК",
    prompt: "Нужно требование в управляющую компанию о…",
  },
];

const DocumentGenerator = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    initiator: "",
    contact: "",
    date: "",
    meetingForm: "",
    agenda: "",
  });
  const [generatedDocument, setGeneratedDocument] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTemplateClick = (templatePrompt: string) => {
    setPrompt(templatePrompt);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate document generation
    setTimeout(() => {
      const meetingFormText = formData.meetingForm === "in-person" ? "очной" : 
                              formData.meetingForm === "absentee" ? "заочной" : 
                              formData.meetingForm === "mixed" ? "очно-заочной" : "";
      
      const document = `УВЕДОМЛЕНИЕ
о проведении общего собрания собственников помещений
в многоквартирном доме

Уважаемые собственники!

Инициатор собрания ${formData.initiator || "[ФИО инициатора]"} уведомляет Вас о проведении общего собрания собственников помещений в многоквартирном доме, расположенном по адресу: ${formData.address || "[адрес дома]"}.

Форма проведения собрания: ${meetingFormText || "[форма проведения]"}

Дата проведения: ${formData.date || "[дата проведения]"}

Повестка дня:
${formData.agenda || "[вопросы повестки дня]"}

Контактные данные инициатора: ${formData.contact || "[контактные данные]"}

Решения общего собрания собственников помещений в многоквартирном доме оформляются протоколами в соответствии с требованиями, установленными федеральным органом исполнительной власти.

С уважением,
${formData.initiator || "[ФИО инициатора]"}`;

      setGeneratedDocument(document);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDocument);
      toast({
        title: "Скопировано",
        description: "Текст документа скопирован в буфер обмена",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать текст",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedDocument], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Загружено",
      description: "Документ сохранён как текстовый файл",
    });
  };

  const handleRegenerate = () => {
    setGeneratedDocument("");
    handleGenerate();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Intro Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Генератор документов
              </h1>
              <p className="text-lg text-muted-foreground">
                Подготовьте документ для общего собрания или обращения — за несколько минут
              </p>
            </div>
          </div>
        </section>

        {/* Main Working Area */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Input */}
              <div className="space-y-8">
                {/* Free Input Field */}
                <div className="space-y-4">
                  <Label htmlFor="prompt" className="text-base font-medium">
                    Опишите, что нужно подготовить
                  </Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Нужно уведомление о проведении общего собрания собственников для дома по адресу…"
                    className="min-h-[120px] text-base"
                  />
                </div>

                {/* Quick Templates */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Быстрые шаблоны:</p>
                  <div className="flex flex-wrap gap-2">
                    {templates.map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleTemplateClick(template.prompt)}
                        className="text-sm"
                      >
                        {template.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* House Data Form */}
                <div className="space-y-4 p-6 bg-muted/30 rounded-lg border border-border">
                  <h3 className="font-medium text-foreground">Данные дома</h3>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес дома</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="г. Москва, ул. Примерная, д. 1"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="initiator">Инициатор (ФИО)</Label>
                        <Input
                          id="initiator"
                          value={formData.initiator}
                          onChange={(e) => handleInputChange("initiator", e.target.value)}
                          placeholder="Иванов Иван Иванович"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact">Контактные данные</Label>
                        <Input
                          id="contact"
                          value={formData.contact}
                          onChange={(e) => handleInputChange("contact", e.target.value)}
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Дата проведения / сроки</Label>
                        <Input
                          id="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          placeholder="15 февраля 2026 г."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meetingForm">Форма ОСС</Label>
                        <Select
                          value={formData.meetingForm}
                          onValueChange={(value) => handleInputChange("meetingForm", value)}
                        >
                          <SelectTrigger id="meetingForm">
                            <SelectValue placeholder="Выберите форму" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in-person">Очно</SelectItem>
                            <SelectItem value="absentee">Заочно</SelectItem>
                            <SelectItem value="mixed">Очно-заочно</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="agenda">Вопросы повестки</Label>
                      <Textarea
                        id="agenda"
                        value={formData.agenda}
                        onChange={(e) => handleInputChange("agenda", e.target.value)}
                        placeholder="1. Выбор председателя и секретаря собрания&#10;2. Утверждение порядка уведомления&#10;3. ..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {isGenerating ? "Генерация..." : "Сгенерировать документ"}
                </Button>
              </div>

              {/* Right Column - Result */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-foreground">Результат</h3>
                
                <div className="min-h-[400px] p-6 bg-card border border-border rounded-lg">
                  {generatedDocument ? (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                      {generatedDocument}
                    </pre>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>Заполните форму и нажмите «Сгенерировать документ»</p>
                      </div>
                    </div>
                  )}
                </div>

                {generatedDocument && (
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="w-4 h-4 mr-2" />
                      Скопировать текст
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Скачать .txt
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRegenerate}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Сгенерировать заново
                    </Button>
                  </div>
                )}
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

      <Footer />
    </div>
  );
};

export default DocumentGenerator;
