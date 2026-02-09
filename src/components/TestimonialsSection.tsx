import React from "react";
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

// Mock data roughly based on likely clients for Wendooka
const testimonials = [
    {
        quote:
            "Wendooka Digital a transformé notre présence en ligne. Leur approche stratégique et leur design haut de gamme ont directement impacté nos ventes. Une équipe professionnelle et visionnaire.",
        name: "Thomas Sankara",
        designation: "CEO, Africa Tech Solutions",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
    },
    {
        quote:
            "La collaboration a été fluide du début à la fin. Ils ont su capturer l'essence de notre marque et la traduire en une expérience digitale mémorable. Je recommande vivement !",
        name: "Sarah M.",
        designation: "Fondatrice, EcoLife",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
    },
    {
        quote:
            "Plus qu'une agence, un véritable partenaire. Le site web qu'ils ont créé pour nous est non seulement magnifique, mais il est aussi incroyablement performant.",
        name: "Jean-Paul K.",
        designation: "Directeur Marketing, Solar Energy",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
    },
];

const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-dark-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-accent/10 via-dark-black to-dark-black pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-lime-accent font-bold tracking-widest uppercase text-sm mb-2 block">Témoignages</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-poppins">Ce que disent nos clients</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        La satisfaction de nos partenaires est notre plus belle réussite. Découvrez leurs retours sur notre collaboration.
                    </p>
                </div>

                <div className="flex justify-center">
                    <CircularTestimonials
                        testimonials={testimonials}
                        autoplay={true}
                        colors={{
                            name: "#ffffff",
                            designation: "#C6FF00", // lime-accent
                            testimony: "#e5e7eb",
                            arrowBackground: "#1f2937",
                            arrowForeground: "#C6FF00",
                            arrowHoverBackground: "#C6FF00",
                        }}
                        fontSizes={{
                            name: "24px",
                            designation: "16px",
                            quote: "20px",
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
