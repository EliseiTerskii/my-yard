import { useState, useMemo } from "react";
import { GraduationCap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LectureCard from "@/components/lectorium/LectureCard";
import CourseFilter from "@/components/lectorium/CourseFilter";
import TagFilter from "@/components/lectorium/TagFilter";
import { filterLectures } from "@/data/lectures";

const Lectorium = () => {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredLectures = useMemo(() => {
    return filterLectures(selectedCourse, selectedTag);
  }, [selectedCourse, selectedTag]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-12 md:py-16">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Лекторий
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Короткие видеолекции о ЖКХ, управлении домом и контроле работ. 
              Каждая лекция — 2 минуты полезной информации.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-6 border-b bg-background sticky top-16 z-40">
          <div className="container space-y-4">
            <CourseFilter 
              selectedCourse={selectedCourse} 
              onCourseChange={setSelectedCourse} 
            />
            <TagFilter 
              selectedTag={selectedTag} 
              onTagChange={setSelectedTag} 
            />
          </div>
        </section>

        {/* Lectures Grid */}
        <section className="py-10 md:py-14">
          <div className="container">
            {filteredLectures.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  Лекции по выбранным фильтрам не найдены
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Найдено лекций: {filteredLectures.length}
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredLectures.map((lecture) => (
                    <LectureCard key={lecture.id} lecture={lecture} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Lectorium;
