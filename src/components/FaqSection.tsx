import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Travaillez-vous sur tous les types de projets ?",
    answer: "Nous accompagnons principalement des projets digitaux structurés, avec des objectifs clairs et un budget cohérent avec les enjeux."
  },
  {
    question: "Quel est votre budget minimum pour un projet ?",
    answer: "Chaque projet est différent, mais nous intervenons généralement sur des projets nécessitant un réel investissement stratégique et technique."
  },
  {
    question: "Quels sont vos délais de réponse ?",
    answer: "Nous répondons sous 24 à 48 heures ouvrées après réception d’une demande complète."
  },
  {
    question: "Proposez-vous un devis gratuit ?",
    answer: "Oui, après analyse de votre besoin et validation de l’adéquation avec notre expertise."
  }
];

const FaqSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white text-dark-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <p className="font-bold text-lime-accent mb-4 tracking-widest uppercase text-sm">Précisions</p>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins">Questions fréquentes avant de nous contacter</h2>
        </div>
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-2xl px-6 data-[state=open]:bg-lime-accent transition-colors"
            >
              <AccordionTrigger className="text-left text-xl font-bold hover:no-underline py-6">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-800 data-[state=open]:text-dark-black pb-6 text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;