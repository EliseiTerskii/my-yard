import { useState } from "react";
import { FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {aiModes, useTemplates} from "@/hooks/useDocument.ts";
import {Loader} from "@/components/ui/loader.tsx";

interface TemplateGeneratorTabProps {
  onGenerate: (data: TemplateFormData) => void;
  isGenerating: boolean;
}

export interface TemplateFormData {
  documentType: string;
  aiMode: "none" | "spelling" | "full";
  houseAddress: string;
  initiatorName: string;
  contactInfo: string;
  meetingDate: string;
  meetingForm: string;
  agendaItems: string;
  additionalInfo: string;
}

const TemplateGeneratorTab = ({ onGenerate, isGenerating }: TemplateGeneratorTabProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const {data: templates, isLoading: isTemplatesLoading} = useTemplates();

  const [aiMode, setAiMode] = useState<"none" | "spelling" | "full">("spelling");
  const [formData, setFormData] = useState({
    houseAddress: "",
    initiatorName: "",
    contactInfo: "",
    meetingDate: "",
    meetingForm: "",
    agendaItems: "",
    additionalInfo: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    onGenerate({
      documentType: selectedTemplate,
      aiMode,
      ...formData,
    });
  };

  const isFormValid = selectedTemplate && formData.houseAddress && formData.meetingForm;

  return (
    <div className="space-y-8">
      {/* Template Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Выберите шаблон</Label>
        <div className="grid sm:grid-cols-2 gap-3">
          {isTemplatesLoading && <Loader/>}
          {templates && templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                "p-4 rounded-lg border text-left transition-all",
                "hover:border-primary/50 hover:bg-muted/50",
                selectedTemplate === template.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{template.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
                {selectedTemplate === template.id && (
                  <Check className="w-5 h-5 text-primary shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Mode Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Обработка текста</Label>
        <RadioGroup
          value={aiMode}
          onValueChange={(value) => setAiMode(value as "none" | "spelling" | "full")}
          className="grid sm:grid-cols-3 gap-3"
        >
          {aiModes.map((mode) => (
            <label
              key={mode.id}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                "hover:border-primary/50 hover:bg-muted/50",
                aiMode === mode.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-card"
              )}
            >
              <RadioGroupItem value={mode.id} className="mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{mode.label}</p>
                <p className="text-sm text-muted-foreground">{mode.description}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Form Fields */}
      {selectedTemplate && (
        <div className="space-y-4 p-6 bg-muted/30 rounded-lg border border-border">
          <h3 className="font-medium text-foreground">Данные для документа</h3>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="houseAddress">Адрес дома *</Label>
              <Input
                id="houseAddress"
                value={formData.houseAddress}
                onChange={(e) => handleInputChange("houseAddress", e.target.value)}
                placeholder="г. Москва, ул. Примерная, д. 1"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initiatorName">Инициатор (ФИО)</Label>
                <Input
                  id="initiatorName"
                  value={formData.initiatorName}
                  onChange={(e) => handleInputChange("initiatorName", e.target.value)}
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo">Контактные данные</Label>
                <Input
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meetingDate">Дата проведения / сроки</Label>
                <Input
                  id="meetingDate"
                  value={formData.meetingDate}
                  onChange={(e) => handleInputChange("meetingDate", e.target.value)}
                  placeholder="15 февраля 2026 г."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingForm">Форма ОСС *</Label>
                <Select
                  value={formData.meetingForm}
                  onValueChange={(value) => handleInputChange("meetingForm", value)}
                >
                  <SelectTrigger id="meetingForm">
                    <SelectValue placeholder="Выберите форму" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="очно">Очно</SelectItem>
                    <SelectItem value="заочно">Заочно</SelectItem>
                    <SelectItem value="очно-заочно">Очно-заочно</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agendaItems">Вопросы повестки / суть требования</Label>
              <Textarea
                id="agendaItems"
                value={formData.agendaItems}
                onChange={(e) => handleInputChange("agendaItems", e.target.value)}
                placeholder="1. Выбор председателя и секретаря собрания&#10;2. Утверждение порядка уведомления&#10;3. ..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Дополнительная информация</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Любые дополнительные сведения для включения в документ..."
                className="min-h-[80px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !isFormValid}
        size="lg"
        className="w-full sm:w-auto"
      >
        <FileText className="w-5 h-5 mr-2" />
        {isGenerating ? "Генерация..." : "Сгенерировать документ"}
      </Button>
    </div>
  );
};

export default TemplateGeneratorTab;
