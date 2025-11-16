"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Eye } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  description: z.string().optional(),
  tags: z.string().optional(), // Comma-separated string for tags
  image: z.string().url("L'URL de l'image doit être valide.").optional().or(z.literal('')),
  category: z.string().optional(),
  link: z.string().url("L'URL du projet doit être valide.").optional().or(z.literal('')),
  status: z.enum(['draft', 'published']),
});

type ProjectFormValues = z.infer<typeof formSchema>;

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      image: '',
      category: '',
      link: '',
      status: 'draft',
    },
  });

  const { watch } = form;
  const link = watch('link');
  const status = watch('status');

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchProject = async () => {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          showError("Erreur lors du chargement du projet : " + error.message);
          navigate('/dashboard/projects');
        } else if (data) {
          form.reset({
            ...data,
            tags: data.tags ? data.tags.join(', ') : '', // Convert array to comma-separated string
          });
        }
        setLoading(false);
      };
      fetchProject();
    }
  }, [id, form, navigate]);

  const onSubmit = async (values: ProjectFormValues) => {
    setIsSubmitting(true);
    // No user_id needed as authentication is removed
    // const user = (await supabase.auth.getUser()).data.user; 

    const projectData = {
      ...values,
      user_id: null, // Set user_id to null as there's no authenticated user
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [], // Convert comma-separated string to array
      updated_at: new Date().toISOString(),
    };

    let error = null;
    if (id) {
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('projects')
        .insert(projectData);
      error = insertError;
    }

    if (error) {
      showError("Erreur lors de la sauvegarde du projet : " + error.message);
    } else {
      showSuccess("Projet sauvegardé avec succès !");
      navigate('/dashboard/projects');
    }
    setIsSubmitting(false);
  };

  const handlePreview = () => {
    if (link && status === 'published') {
      window.open(link, '_blank');
    } else {
      showError("La prévisualisation n'est disponible que pour les projets publiés avec un lien valide.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement du formulaire...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">{id ? 'Modifier le Projet' : 'Créer un Nouveau Projet'}</h2>
        <Button 
          variant="outline" 
          className="border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-lg"
          onClick={handlePreview}
          disabled={!link || status !== 'published'}
        >
          <Eye className="h-5 w-5 mr-2" />
          Prévisualiser
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-dark-gray p-8 rounded-lg border border-gray-800">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titre du projet</FormLabel>
                <FormControl>
                  <Input placeholder="Mon super projet" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description détaillée du projet..." {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[100px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Tags (séparés par des virgules)</FormLabel>
                <FormControl>
                  <Input placeholder="UI/UX Design, Développement Web, E-commerce" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">URL de l'image principale</FormLabel>
                <FormControl>
                  <Input placeholder="/public/mon-image-projet.jpg" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Catégorie</FormLabel>
                <FormControl>
                  <Input placeholder="Développement Web" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Lien du projet (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.monprojet.com" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-dark-black border-gray-600 text-white focus:ring-lime-accent">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-dark-black border-gray-600 text-white">
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {id ? 'Mettre à jour le projet' : 'Créer le projet'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;