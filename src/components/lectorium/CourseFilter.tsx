import { cn } from "@/lib/utils";
import { courses } from "@/data/lectures";

interface CourseFilterProps {
  selectedCourse: string;
  onCourseChange: (courseId: string) => void;
}

const CourseFilter = ({ selectedCourse, onCourseChange }: CourseFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onCourseChange(course.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            selectedCourse === course.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {course.label}
        </button>
      ))}
    </div>
  );
};

export default CourseFilter;
