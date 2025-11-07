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

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published' | 'scheduled';
  created_at: string;
}

const BlogPostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, category, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      showError("Erreur lors du chargement des articles : " + error.message);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return;
    }
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      showError("Erreur lors de la suppression de l'article : " + error.message);
    } else {
      showSuccess("Article supprimé avec succès !");
      fetchPosts(); // Refresh the list
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement des articles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">Tous les Articles</h2>
        <Button asChild className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg">
          <Link to="/dashboard/blog/new">
            <PlusCircle className="h-5 w-5 mr-2" />
            Créer un nouvel article
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center">Aucun article trouvé. Créez-en un nouveau !</p>
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
              {posts.map((post) => (
                <TableRow key={post.id} className="border-gray-800 hover:bg-gray-700/50">
                  <TableCell className="font-medium text-white">{post.title}</TableCell>
                  <TableCell className="text-gray-300">{post.category}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        post.status === 'published' ? 'bg-green-600 hover:bg-green-600/90 text-white' :
                        post.status === 'scheduled' ? 'bg-blue-600 hover:bg-blue-600/90 text-white' :
                        'bg-gray-600 hover:bg-gray-600/90 text-white'
                      }
                    >
                      {post.status === 'draft' ? 'Brouillon' : post.status === 'published' ? 'Publié' : 'Programmé'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">{new Date(post.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                        <Link to={`/dashboard/blog/${post.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white" disabled={post.status !== 'published'}>
                        <Link to={`/blog/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(post.id)}>
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

export default BlogPostsList;