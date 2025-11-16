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
import { CalendarIcon, Loader2, Eye } from 'lucide-react'; // Import Eye icon
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  slug: z.string().min(1, "Le slug est requis.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Le slug doit être en minuscules, sans espaces et avec des tirets."),
  content: z.string().optional(),
  status: z.enum(['draft', 'published', 'scheduled']),
  published_at: z.date().optional().nullable(),
  seo_title: z.string().optional(),
  meta_description: z.string().optional(),
  canonical_url: z.string().optional(),
});

type PageFormValues = z.infer<typeof formSchema>;

const PageForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      published_at: null,
      seo_title: '',
      meta_description: '',
      canonical_url: '',
    },
  });

  const { watch, setValue } = form;
  const title = watch('title');
  const slug = watch('slug'); // Watch slug for preview button
  const status = watch('status');

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchPage = async () => {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          showError("Erreur lors du chargement de la page : " + error.message);
          navigate('/dashboard/pages');
        } else if (data) {
          form.reset({
            ...data,
            published_at: data.published_at ? new Date(data.published_at) : null,
          });
        }
        setLoading(false);
      };
      fetchPage();
    }
  }, [id, form, navigate]);

  useEffect(() => {
    if (!id && title) { // Only auto-generate slug for new pages if title exists
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
        .trim();
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [title, id, setValue]);

  const onSubmit = async (values: PageFormValues) => {
    setIsSubmitting(true);
    // No user_id needed as authentication is removed
    // const user = (await supabase.auth.getUser()).data.user;

    // if (!user) {
    //   showError("Vous devez être connecté pour créer ou modifier une page.");
    //   setIsSubmitting(false);
    //   return;
    // }

    const pageData = {
      ...values,
      user_id: null, // Set user_id to null as there's no authenticated user
      published_at: values.status === 'scheduled' && values.published_at 
        ? values.published_at.toISOString() 
        : (values.status === 'published' ? new Date().toISOString() : null),
      updated_at: new Date().toISOString(),
    };

    let error = null;
    if (id) {
      const { error: updateError } = await supabase
        .from('pages')
        .update(pageData)
        .eq('id', id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('pages')
        .insert(pageData);
      error = insertError;
    }

    if (error) {
      showError("Erreur lors de la sauvegarde de la page : " + error.message);
    } else {
      showSuccess("Page sauvegardée avec succès !");
      navigate('/dashboard/pages');
    }
    setIsSubmitting(false);
  };

  const handlePreview = () => {
    if (slug && status === 'published') {
      window.open(`/${slug}`, '_blank');
    } else {
      showError("La prévisualisation n'est disponible que pour les pages publiées. Enregistrez et publiez d'abord.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement du formulaire...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">{id ? 'Modifier la Page' : 'Créer une Nouvelle Page'}</h2>
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
                <FormLabel className="text-white">Titre de la page</FormLabel>
                <FormControl>
                  <Input placeholder="Mon super titre de page" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
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
                  <Input placeholder="mon-super-titre-de-page" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
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
                <FormLabel className="text-white">Contenu</FormLabel>
                <FormControl>
                  <Textarea placeholder="Commencez à écrire votre contenu ici..." {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[200px]" />
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
                      <SelectItem value="published">Publiée</SelectItem>
                      <SelectItem value="scheduled">Programmée</SelectItem>
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
                              format(field.value, "PPP")
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

          <h3 className="text-xl font-bold font-poppins text-white mt-10 mb-4">Optimisation SEO</h3>
          <FormField
            control={form.control}
            name="seo_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titre SEO</FormLabel>
                <FormControl>
                  <Input placeholder="Titre optimisé pour les moteurs de recherche" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Méta-description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description courte et pertinente pour le SEO" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[100px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="canonical_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">URL Canonique</FormLabel>
                <FormControl>
                  <Input placeholder="https://votresite.com/page-canonique" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {id ? 'Mettre à jour la page' : 'Créer la page'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PageForm;