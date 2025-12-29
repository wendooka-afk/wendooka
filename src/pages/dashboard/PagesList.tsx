import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'scheduled';
  created_at: string;
}

const PagesList: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('id, title, slug, status, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        showError("Erreur lors du chargement des pages : " + error.message);
      } else {
        setPages(data || []);
      }
    } catch (error: any) {
      showError("Erreur lors du chargement des pages : " + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette page ?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) {
        showError("Erreur lors de la suppression de la page : " + error.message);
      } else {
        showSuccess("Page supprimée avec succès !");
        fetchPages(); // Refresh the list
      }
    } catch (error: any) {
      showError("Erreur lors de la suppression de la page : " + error.message);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement des pages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">Toutes les Pages</h2>
        <Button 
          asChild 
          className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg"
        >
          <Link to="/dashboard/pages/new">
            <PlusCircle className="h-5 w-5 mr-2" />
            Créer une nouvelle page
          </Link>
        </Button>
      </div>
      
      {pages.length === 0 ? (
        <p className="text-gray-400 text-center">Aucune page trouvée. Créez-en une nouvelle !</p>
      ) : (
        <div className="bg-dark-gray rounded-lg border border-gray-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-dark-black hover:bg-dark-black">
                <TableHead className="text-lime-accent">Titre</TableHead>
                <TableHead className="text-lime-accent">Slug</TableHead>
                <TableHead className="text-lime-accent">Statut</TableHead>
                <TableHead className="text-lime-accent">Créée le</TableHead>
                <TableHead className="text-lime-accent text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id} className="border-gray-800 hover:bg-gray-700/50">
                  <TableCell className="font-medium text-white">{page.title}</TableCell>
                  <TableCell className="text-gray-300">{page.slug}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        page.status === 'published' 
                          ? 'bg-green-600 hover:bg-green-600/90 text-white' 
                          : page.status === 'scheduled' 
                            ? 'bg-blue-600 hover:bg-blue-600/90 text-white' 
                            : 'bg-gray-600 hover:bg-gray-600/90 text-white'
                      }
                    >
                      {page.status === 'draft' 
                        ? 'Brouillon' 
                        : page.status === 'published' 
                          ? 'Publiée' 
                          : 'Programmée'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(page.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Link to={`/dashboard/pages/${page.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      {/* Preview button links to the dynamic page */}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        disabled={page.status !== 'published'}
                      >
                        <Link to={`/${page.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(page.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PagesList;