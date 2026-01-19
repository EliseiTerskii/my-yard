import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ArticleCard from "@/components/legal/ArticleCard";
import CategoryFilter from "@/components/legal/CategoryFilter";
import { filterArticles } from "@/data/legalArticles";

const LegalBase = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = filterArticles(selectedCategory, searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Intro Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Юридическая база
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Практические разъяснения и инструкции по вопросам ЖКХ
          </p>
        </section>

        {/* Search and Filters */}
        <section className="mb-8 space-y-6">
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по заголовкам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        {/* Articles Grid */}
        <section>
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Статьи не найдены. Попробуйте изменить параметры поиска.
              </p>
            </div>
          )}
        </section>

        {/* Results Count */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Показано статей: {filteredArticles.length}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalBase;
