import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TeamMember {
    name: string;
    image: string;
    role?: string;
    bio?: string;
}

interface AnimatedTeamSectionProps {
    title: string;
    description: string;
    members: TeamMember[];
    className?: string;
}

export const AnimatedTeamSection: React.FC<AnimatedTeamSectionProps> = ({
    title,
    description,
    members,
    className,
}) => {
    return (
        <section className={cn("py-24 md:py-32 overflow-hidden", className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-6xl font-bold font-poppins mb-6 tracking-tight text-white">
                            {title}
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative flex flex-col items-center"
                        >
                            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] bg-dark-gray">
                                <motion.img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                {/* Information Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        className="space-y-2 text-center"
                                    >
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {member.name}
                                        </h3>
                                        {member.role && (
                                            <p className="text-lime-accent font-bold text-xs uppercase tracking-widest">
                                                {member.role}
                                            </p>
                                        )}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Bio Tooltip or Bottom Text */}
                            <div className="mt-8 text-center px-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-lime-accent transition-colors">
                                    {member.name}
                                </h3>
                                {member.role && (
                                    <p className="text-lime-accent font-bold text-sm uppercase tracking-widest mt-2">
                                        {member.role}
                                    </p>
                                )}
                                {member.bio && (
                                    <p className="text-gray-400 mt-4 leading-relaxed line-clamp-3">
                                        {member.bio}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
