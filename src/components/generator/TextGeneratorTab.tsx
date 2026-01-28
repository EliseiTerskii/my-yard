import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextGeneratorTabProps {
  onGenerate: (text: string) => void;
  isGenerating: boolean;
}

const TextGeneratorTab = ({ onGenerate, isGenerating }: TextGeneratorTabProps) => {
  const [sourceText, setSourceText] = useState("");

  const handleGenerate = () => {
    if (sourceText.trim()) {
      onGenerate(sourceText);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="source-text" className="text-base font-medium">
          Исходный текст
        </Label>
        <p className="text-sm text-muted-foreground">
          Вставьте большой текст — ИИ переформулирует, структурирует и создаст документ
        </p>
        <Textarea
          id="source-text"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="Вставьте сюда текст для обработки: протокол заседания, заметки, переписку..."
          className="min-h-[250px] text-base"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !sourceText.trim()}
        size="lg"
        className="w-full sm:w-auto"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        {isGenerating ? "Генерация..." : "Сгенерировать документ"}
      </Button>
    </div>
  );
};

export default TextGeneratorTab;
