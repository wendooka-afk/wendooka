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
    answer: "La durée de création d'un site web varie en fonction de la complexité du projet. Nous travaillons en étroite collaboration avec vous pour établir un calendrier réaliste en fonction de vos exigences. Cela peut aller de quelques semaines à plusieurs mois."
  },
  {
    question: "Proposez-vous des services de maintenance après la création du site web ?",
    answer: "Oui, nous offrons des services de maintenance pour assurer le bon fonctionnement de votre site web. Nous pouvons effectuer des mises à jour, des sauvegardes, et répondre à vos demandes de support technique."
  },
  {
    question: "Comment travaillez-vous avec vos clients ?",
    answer: "Nous adoptons une approche collaborative avec nos clients. Nous commençons par comprendre vos objectifs, vos besoins et votre identité de marque. Ensuite, nous vous impliquons tout au long du processus de création."
  },
  {
    question: "Proposez-vous des services de référencement (SEO) ?",
    answer: "Oui, nous proposons des services de référencement pour améliorer la visibilité de votre site web sur les moteurs de recherche. Nous optimisons le contenu, la structure et les balises afin d'optimiser votre classement dans les résultats de recherche."
  },
  {
    question: "Comment puis-je obtenir un devis pour mes besoins en web design ?",
    answer: "Pour obtenir un devis personnalisé, vous pouvez nous contacter via notre formulaire de contact ou par téléphone. Nous serons ravis d'évaluer vos besoins et de vous fournir une estimation détaillée."
  }
];

const FaqSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-black text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">Foire aux questions (FAQ)</h2>
          <p className="text-lg text-gray-400 mt-4">Vous avez une question? Trouvez la réponse ici.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
              <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-400">
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