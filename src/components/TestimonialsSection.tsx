import React from "react";
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

// Mock data roughly based on likely clients for Wendooka
const testimonials = [
    {
        quote:
            "Wendooka a parfaitement capté l'essence de notre travail. Le site reflète notre identité et notre passion pour le documentaire. Une réalisation qui nous positionne à la hauteur de nos ambitions internationales.",
        name: "Dewa Aboubakar",
        designation: "Fondateur, Bandiko Production",
        src: "/Client dewa aboubakar Bandiko productions.webp",
    },
    {
        quote:
            "Grâce à l'expertise de Wendooka, notre association dispose enfin d'une vitrine digne de ses actions. Le site a immédiatement renforcé notre crédibilité auprès des partenaires internationaux.",
        name: "Oumarou Sanda Aboubakar",
        designation: "Président, Association Mballen",
        src: "/client Oumarou Sanda Aboubakar Mballen.jpeg",
    },
    {
        quote:
            "Un travail technique remarquable. Le site est ultra-rapide même en zone rurale, ce qui était notre exigence n°1. Wendooka a parfaitement compris nos contraintes spécifiques.",
        name: "Eric Nguele",
        designation: "Promoteur, Kubaru Sahel",
        src: "/Client Eric Nguele Kubaru Sahel 24.jpg",
    },
    {
        quote:
            "La digitalisation de nos services était un défi majeur. Ce portail web rapproche l'administration des citoyens et modernise l'image de notre commune. Une réalisation impeccable.",
        name: "Idrissou Abana",
        designation: "Maire, Commune de Ngaoundéré 2e",
        src: "/Client Idrissou abana commune ngaoundere 2.webp",
    },
    {
        quote:
            "Wendooka a su traduire la complexité de nos offres en un site clair et percutant. Depuis la mise en ligne, nous constatons un impact réel sur notre image de marque.",
        name: "Hamidou Ahmadou",
        designation: "CEO, Sahel Consulting",
        src: "/Client Hamidou Ahmadou Sahel Consulting.jpeg",
    },
    {
        quote:
            "Une équipe réactive et à l'écoute. Mon site personnel reflète parfaitement mon parcours et mes ambitions. Je recommande vivement leur professionnalisme.",
        name: "Abbo Oumarou",
        designation: "Entrepreneur",
        src: "/Client Abbo Oumarou abbo-oumarou.com.jpeg",
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
