import {Copy, RefreshCw, FileText, Download} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {downloadFile} from "@/lib/utils.ts";
import {Markdown} from "@/components/ui/markdown.tsx";

interface DocumentResultProps {
  document: string;
  downloadUrl: string;
  onRegenerate: () => void;
}

const DocumentResult = ({ document, downloadUrl, onRegenerate }: DocumentResultProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(document);
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

  const handleDownloadDocx = async () => {
    try {
      await downloadFile(downloadUrl);

      toast({
        title: "Загружено",
        description: "Документ сохранён как .docx файл",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось создать документ",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-foreground">Результат</h3>

      <div className="min-h-[400px] p-6 bg-card border border-border rounded-lg">
        {document ? (
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
            <Markdown content={document}/>
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

      {document && (
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Скопировать текст
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadDocx}>
            <Download className="w-4 h-4 mr-2" />
            Скачать .docx
          </Button>
          <Button variant="outline" size="sm" onClick={onRegenerate}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Сгенерировать заново
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentResult;
