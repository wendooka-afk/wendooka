import React from 'react';

const DashboardIndex: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold font-poppins text-lime-accent">Bienvenue sur votre Tableau de Bord !</h2>
      <p className="text-lg text-gray-300">
        Utilisez la barre latérale pour naviguer entre les différentes sections de gestion de votre site.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-dark-gray p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-2">Gestion des Pages</h3>
          <p className="text-gray-400">Créez, modifiez et publiez vos pages.</p>
        </div>
        <div className="bg-dark-gray p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-2">Médiathèque</h3>
          <p className="text-gray-400">Gérez vos images et fichiers.</p>
        </div>
        <div className="bg-dark-gray p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold mb-2">Paramètres SEO</h3>
          <p className="text-gray-400">Optimisez le référencement de chaque page.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;