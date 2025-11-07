import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface Project {
  id: string;
  title: string;
  category: string;
  status: 'draft' | 'published';
  created_at: string;
  link?: string; // Ajout de la propriété link
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, category, status, created_at, link') // Sélectionner aussi le lien
      .order('created_at', { ascending: false });

    if (error) {
      showError("Erreur lors du chargement des projets : " + error.message);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      return;
    }
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      showError("Erreur lors de la suppression du projet : " + error.message);
    } else {
      showSuccess("Projet supprimé avec succès !");
      fetchProjects(); // Refresh the list
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement des projets...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">Tous les Projets</h2>
        <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg">
          <Link to="/dashboard/projects/new">
            <PlusCircle className="h-5 w-5 mr-2" />
            Créer un nouveau projet
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-400 text-center">Aucun projet trouvé. Créez-en un nouveau !</p>
      ) : (
        <div className="bg-dark-gray rounded-lg border border-gray-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-dark-black hover:bg-dark-black">
                <TableHead className="text-lime-accent">Titre</TableHead>
                <TableHead className="text-lime-accent">Catégorie</TableHead>
                <TableHead className="text-lime-accent">Statut</TableHead>
                <TableHead className="text-lime-accent">Créé le</TableHead>
                <TableHead className="text-lime-accent text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="border-gray-800 hover:bg-gray-700/50">
                  <TableCell className="font-medium text-white">{project.title}</TableCell>
                  <TableCell className="text-gray-300">{project.category}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        project.status === 'published' ? 'bg-green-600 hover:bg-green-600/90 text-white' :
                        'bg-gray-600 hover:bg-gray-600/90 text-white'
                      }
                    >
                      {project.status === 'draft' ? 'Brouillon' : 'Publié'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">{new Date(project.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Link to={`/dashboard/projects/${project.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      {project.status === 'published' && project.link && (
                        <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(project.id)}>
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

export default ProjectsList;