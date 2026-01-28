import {Link} from "react-router-dom";
import {Play, Clock} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Lecture} from "@/hooks/useLectures.ts";

interface LectureCardProps {
    lecture: Lecture;
}

const LectureCard = ({lecture}: LectureCardProps) => {
    return (
        <Link to={`/lectorium/${lecture.id}`}>
            <Card
                className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="relative aspect-video bg-muted overflow-hidden">
                    <div
                        className="w-full h-full inset-0 rounded-lg bg-gradient-to-br mb-3 flex items-center justify-center relative overflow-hidden">
                        <img className="object-cover object-center w-full h-full" alt={lecture.title}
                             src={lecture.previewImage}/>
                        <div
                            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center  absolute z-10">
                            <Play className="w-8 h-8 text-primary ml-1"/>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground"/>
                        <span className="text-xs font-medium text-foreground">{lecture.duration}</span>
                    </div>
                </div>

                <CardContent className="p-4 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                        {lecture.tags.slice(0, 2).map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs font-normal bg-secondary/50"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {lecture.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {lecture.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
};

export default LectureCard;
