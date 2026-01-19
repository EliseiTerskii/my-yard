import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, FileText, AlertTriangle, CheckCircle2, Lightbulb, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getArticleById, getRelatedArticles, getCategoryLabel } from "@/data/legalArticles";

const ArticleDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const article = articleId ? getArticleById(articleId) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
          <Link to="/legal">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к базе знаний
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.relatedArticles);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link to="/legal">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Юридическая база
            </Button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">
                {getCategoryLabel(article.category)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} мин чтения</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {article.title}
            </h1>
          </header>

          {/* Short Answer */}
          <section className="mb-10">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <p className="text-base leading-relaxed">
                  {article.shortAnswer}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* When Important */}
          <section className="mb-10">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Когда это важно
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {article.whenImportant.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Steps */}
          <section className="mb-10">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Что делать по шагам
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {article.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* Common Mistakes */}
          <section className="mb-10">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Частые ошибки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {article.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span className="text-sm">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Template Link */}
          {article.hasTemplate && article.templateLink && (
            <section className="mb-10">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-primary" />
                    Шаблон документа
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link to={article.templateLink}>
                    <Button variant="outline" className="gap-2">
                      Перейти к генератору документов
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="pt-8 border-t">
              <h2 className="text-lg font-semibold mb-4">Также полезно</h2>
              <div className="space-y-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/legal/${related.id}`}
                    className="block p-4 rounded-lg border hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(related.category)}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-sm">{related.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
