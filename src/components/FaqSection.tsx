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
    answer: "Nous créons différents types de sites web, tels que des sites vitrines, des sites e-commerce, des blogs, des portfolios, etc. Nous concevons des sites web sur mesure adaptés à vos besoins spécifiques."
  },
  {
    question: "Combien de temps faut-il pour créer un site web ?",
    answer: "La durée de création d'un site web varie en fonction de la complexité du projet. Nous travaillons en étroite collaboration avec vous pour établir un calendrier réaliste en fonction de vos exigences."
  },
  {
    question: "Proposez-vous des services de maintenance après la création du site web ?",
    answer: "Oui, nous offrons des services de maintenance pour assurer le bon fonctionnement de votre site web. Nous pouvons effectuer des mises à jour, des sauvegardes, et répondre à vos demandes de support technique."
  },
  {
    question: "Proposez-vous des services de référencement (SEO) ?",
    answer: "Oui, nous proposons des services de référencement pour améliorer la visibilité de votre site web sur les moteurs de recherche afin d'optimiser votre classement."
  }
];

const FaqSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-dark-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <p className="font-semibold text-lime-accent mb-2">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">Vous avez des questions ?</h2>
          <p className="text-lg text-gray-600 mt-4">Trouvez les réponses ici.</p>
        </div>
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border border-gray-200 rounded-2xl px-6 data-[state=open]:bg-lime-accent transition-colors"
            >
              <AccordionTrigger className="text-left text-xl font-bold hover:no-underline py-6">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-800 data-[state=open]:text-dark-black pb-6">
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