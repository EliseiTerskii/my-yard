import {Sparkles} from "lucide-react";

export const Loader = () => {
    return (
        <div className="relative">
            <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-12 h-12 text-primary animate-spin"
                          style={{animationDuration: '3s'}}/>
            </div>

            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{animationDuration: '2s'}}>
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 rounded-full bg-primary"/>
            </div>
            <div className="absolute inset-0 animate-spin"
                 style={{animationDuration: '2.5s', animationDirection: 'reverse'}}>
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-2 h-2 rounded-full bg-primary/60"/>
            </div>
        </div>
    )
}