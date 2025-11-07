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
import { PlusCircle, Edit, Trash2, Eye, LayoutTemplate } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface Service {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  created_at: string;
}

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('id, title, slug, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      showError("Erreur lors du chargement des services : " + error.message);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      return;
    }
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      showError("Erreur lors de la suppression du service : " + error.message);
    } else {
      showSuccess("Service supprimé avec succès !");
      fetchServices(); // Refresh the list
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement des services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">Tous les Services</h2>
        <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg">
          <Link to="/dashboard/services/new">
            <PlusCircle className="h-5 w-5 mr-2" />
            Créer un nouveau service
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <p className="text-gray-400 text-center">Aucun service trouvé. Créez-en un nouveau !</p>
      ) : (
        <div className="bg-dark-gray rounded-lg border border-gray-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-dark-black hover:bg-dark-black">
                <TableHead className="text-lime-accent">Titre</TableHead>
                <TableHead className="text-lime-accent">Slug</TableHead>
                <TableHead className="text-lime-accent">Statut</TableHead>
                <TableHead className="text-lime-accent">Créé le</TableHead>
                <TableHead className="text-lime-accent text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id} className="border-gray-800 hover:bg-gray-700/50">
                  <TableCell className="font-medium text-white">{service.title}</TableCell>
                  <TableCell className="text-gray-300">{service.slug}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        service.status === 'published' ? 'bg-green-600 hover:bg-green-600/90 text-white' :
                        'bg-gray-600 hover:bg-gray-600/90 text-white'
                      }
                    >
                      {service.status === 'draft' ? 'Brouillon' : 'Publié'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">{new Date(service.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Link to={`/dashboard/services/${service.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white" disabled={service.status !== 'published'}>
                        <Link to={`/services/${service.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}>
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

export default ServicesList;