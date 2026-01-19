import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { LegalArticle, getCategoryLabel } from "@/data/legalArticles";

interface ArticleCardProps {
  article: LegalArticle;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link to={`/legal/${article.id}`}>
      <Card className="h-full hover:shadow-md transition-all duration-200 hover:border-primary/30 group">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs font-normal">
              {getCategoryLabel(article.category)}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{article.readTime} мин</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.lead}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
