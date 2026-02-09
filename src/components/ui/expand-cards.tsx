"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandOnHoverProps {
    projects: Project[];
}

const ExpandOnHover: React.FC<ExpandOnHoverProps> = ({ projects }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    // If no projects, return null or empty
    if (!projects || projects.length === 0) return null;

    return (
        <div className="w-full py-10">
            <div className="flex w-full items-center justify-center gap-2 h-[500px] overflow-hidden">
                {projects.map((project, idx) => (
                    <div
                        key={project.id || idx}
                        className={cn(
                            "relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out h-full border border-gray-800 bg-gray-900 group",
                            expandedIndex === idx ? "w-[40%] md:w-[60%]" : "w-[15%] md:w-[10%] hover:w-[15%] md:hover:w-[12%]"
                        )}
                        onMouseEnter={() => setExpandedIndex(idx)}
                        onClick={() => setExpandedIndex(idx)} // For mobile touch
                    >
                        {/* Background Image */}
                        <img
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                            src={project.image}
                            alt={project.title}
                        />

                        {/* Overlay Gradient */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500",
                            expandedIndex === idx ? "opacity-100" : "opacity-60"
                        )} />

                        {/* Content - Visible when expanded */}
                        <div className={cn(
                            "absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end transition-all duration-500",
                            expandedIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        )}>
                            <div className="transform transition-all duration-500 delay-100">
                                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-dark-black uppercase bg-lime-accent rounded-full">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 font-poppins">{project.title}</h3>
                                <p className="text-gray-300 line-clamp-2 md:line-clamp-none mb-6 max-w-xl text-sm md:text-base hidden md:block">
                                    {project.short_description}
                                </p>
                                <Link
                                    to={`/portfolio/${project.slug}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-lime-accent hover:text-dark-black hover:border-lime-accent transition-all duration-300"
                                >
                                    Voir le projet <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Vertical Title - Visible when collapsed */}
                        <div className={cn(
                            "absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none",
                            expandedIndex === idx ? "opacity-0" : "opacity-100"
                        )}>
                            <h3 className="text-xl font-bold text-white/50 -rotate-90 whitespace-nowrap tracking-widest uppercase">
                                {project.title.length > 15 ? project.title.substring(0, 15) + "..." : project.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpandOnHover;
