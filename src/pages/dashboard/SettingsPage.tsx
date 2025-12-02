import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold font-poppins text-white">Paramètres du Site</h2>

      <Card className="bg-dark-gray border-gray-800 p-6 space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold text-white">Informations Générales</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div>
            <Label htmlFor="site-name" className="text-gray-300">Nom du site</Label>
            <Input id="site-name" defaultValue="Wendooka" className="bg-dark-black border-gray-700 text-white mt-1" />
          </div>
          <div>
            <Label htmlFor="site-description" className="text-gray-300">Description du site</Label>
            <Input id="site-description" defaultValue="Agence digitale spécialisée en web design et marketing." className="bg-dark-black border-gray-700 text-white mt-1" />
          </div>
          <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg">
            Enregistrer les modifications
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-dark-gray border-gray-800 p-6 space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold text-white">Paramètres SEO par défaut</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <div>
            <Label htmlFor="default-seo-title" className="text-gray-300">Titre SEO par défaut</Label>
            <Input id="default-seo-title" defaultValue="Wendooka - Agence Digitale" className="bg-dark-black border-gray-700 text-white mt-1" />
          </div>
          <div>
            <Label htmlFor="default-meta-description" className="text-gray-300">Méta-description par défaut</Label>
            <Input id="default-meta-description" defaultValue="Découvrez les services de Wendooka : création de sites web, design graphique, UI/UX et marketing digital." className="bg-dark-black border-gray-700 text-white mt-1" />
          </div>
          <Button className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg">
            Enregistrer les paramètres SEO
          </Button>
        </CardContent>
      </Card>

      {/* Vous pouvez ajouter d'autres sections de paramètres ici, par exemple : */}
      {/* <Card className="bg-dark-gray border-gray-800 p-6 space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold text-white">Intégrations</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <p className="text-gray-400">Gérez vos intégrations avec des services tiers.</p>
          <Button variant="outline" className="border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black">
            Connecter Google Analytics
          </Button>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default SettingsPage;