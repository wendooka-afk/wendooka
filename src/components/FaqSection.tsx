import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quels types de sites web créez-vous ?",
    answer: "Nous concevons des sites vitrines, e-commerce, blogs, portfolios et plus encore, entièrement adaptés à vos besoins."
  },
  {
    question: "Combien de temps dure un projet ?",
    answer: "Cela dépend de la complexité. En général, entre 3 et 8 semaines."
  },
  {
    question: "Proposez-vous du support après livraison ?",
    answer: "Oui, nous assurons maintenance, mises à jour et assistance technique."
  },
  {
    question: "Aidez-vous pour le référencement (SEO) ?",
    answer: "Absolument, nous optimisons vos contenus et votre structure pour améliorer votre visibilité."
  },
  {
    question: "Comment obtenir un devis ?",
    answer: "Contactez-nous via le formulaire ou directement sur WhatsApp."
  }
];

const FaqSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-dark-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <p className="font-semibold text-lime-accent mb-2">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">❓ Questions fréquentes</h2>
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