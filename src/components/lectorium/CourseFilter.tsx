import {cn} from "@/lib/utils";
import {useLecturesFilters} from "@/hooks/useLecturesFilters.ts";

interface CourseFilterProps {
    selectedCourse: string;
    onCourseChange: (courseId: string) => void;
}

const FilterSkeleton = () => (
    <section className="">
        <div className="mx-auto">
            <div className="">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-10 w-24 bg-muted rounded-lg animate-pulse"/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const CourseFilter = ({selectedCourse, onCourseChange}: CourseFilterProps) => {
    const {data, isLoading} = useLecturesFilters()
    const courses = data?.courses

    if (isLoading) {
        return <FilterSkeleton/>
    }

    return (
        <div className="flex flex-wrap gap-2">
            <button onClick={() => {
                onCourseChange('');
            }} className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                !selectedCourse
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}>
                Все курсы
            </button>
            {courses && courses.map((course) => (
                <button
                    key={`course-${course}`}
                    onClick={() => onCourseChange(course)}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        selectedCourse === course
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                >
                    {course}
                </button>
            ))}
        </div>
    );
};

export default CourseFilter;
