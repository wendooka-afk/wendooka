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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, Eye } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; // Importation statique de la locale française
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  slug: z.string().min(1, "Le slug est requis.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Le slug doit être en minuscules, sans espaces et avec des tirets."),
  category: z.string().optional(),
  author: z.string().optional(),
  image: z.string().url("L'URL de l'image doit être valide.").optional().or(z.literal('')),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(['draft', 'published', 'scheduled']),
  published_at: z.date().optional().nullable(), // Using published_at for scheduling
});

type BlogPostFormValues = z.infer<typeof formSchema>;

const BlogPostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: '',
      author: '',
      image: '',
      excerpt: '',
      content: '',
      status: 'draft',
      published_at: null,
    },
  });

  const { watch, setValue } = form;
  const title = watch('title');
  const slug = watch('slug');
  const status = watch('status');

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchPost = async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          showError("Erreur lors du chargement de l'article : " + error.message);
          navigate('/dashboard/blog');
        } else if (data) {
          form.reset({
            ...data,
            published_at: data.published_at ? new Date(data.published_at) : null,
          });
        }
        setLoading(false);
      };
      fetchPost();
    }
  }, [id, form, navigate]);

  useEffect(() => {
    if (!id && title) { // Only auto-generate slug for new posts if title exists
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [title, id, setValue]);

  const onSubmit = async (values: BlogPostFormValues) => {
    setIsSubmitting(true);
    const user = (await supabase.auth.getUser()).data.user; // user will be null if auth is removed

    const postData = {
      ...values,
      user_id: user?.id || null, // Assign user_id if available, otherwise null
      date: values.published_at ? format(values.published_at, "dd MMMM yyyy", { locale: fr }) : format(new Date(), "dd MMMM yyyy", { locale: fr }), // Format date for display
      published_at: values.status === 'scheduled' && values.published_at 
        ? values.published_at.toISOString() 
        : (values.status === 'published' ? new Date().toISOString() : null),
      updated_at: new Date().toISOString(),
    };

    let error = null;
    if (id) {
      const { error: updateError } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('posts')
        .insert(postData);
      error = insertError;
    }

    if (error) {
      showError("Erreur lors de la sauvegarde de l'article : " + error.message);
    } else {
      showSuccess("Article sauvegardé avec succès !");
      navigate('/dashboard/blog');
    }
    setIsSubmitting(false);
  };

  const handlePreview = () => {
    if (slug && status === 'published') {
      window.open(`/blog/${slug}`, '_blank');
    } else {
      showError("La prévisualisation n'est disponible que pour les articles publiés. Enregistrez et publiez d'abord.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement du formulaire...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">{id ? 'Modifier l\'Article' : 'Créer un Nouvel Article'}</h2>
        <Button 
          variant="outline" 
          className="border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-lg"
          onClick={handlePreview}
          disabled={!slug || status !== 'published'}
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
                <FormLabel className="text-white">Titre de l'article</FormLabel>
                <FormControl>
                  <Input placeholder="Mon super article de blog" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Slug (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="mon-super-article-de-blog" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Auteur</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">URL de l'image principale</FormLabel>
                <FormControl>
                  <Input placeholder="/public/mon-image.jpg" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Extrait (court résumé)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Un court résumé de l'article..." {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[100px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Contenu de l'article (HTML ou Markdown)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Commencez à écrire votre contenu ici..." {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[300px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <SelectItem value="scheduled">Programmé</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {status === 'scheduled' && (
              <FormField
                control={form.control}
                name="published_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Date de publication</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-dark-black border-gray-600 text-white hover:bg-dark-black hover:text-white",
                              !field.value && "text-gray-400"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Choisir une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-dark-black border-gray-600 text-white" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          initialFocus
                          className="text-white"
                          locale={fr}
                          classNames={{
                            day_selected: "bg-lime-accent text-dark-black hover:bg-lime-accent hover:text-dark-black focus:bg-lime-accent focus:text-dark-black",
                            day_today: "bg-gray-700 text-white",
                            head_cell: "text-gray-400",
                            nav_button: "text-white hover:bg-gray-700",
                            caption_label: "text-white",
                            month: "space-y-4",
                            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            row: "flex w-full mt-2",
                            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: cn(
                              "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
                            ),
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <Button type="submit" className="w-full bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {id ? 'Mettre à jour l\'article' : 'Créer l\'article'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogPostForm;