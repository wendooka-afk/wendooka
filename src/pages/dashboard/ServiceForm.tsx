"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
import { Loader2, Eye, PlusCircle, Trash2, XCircle } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

// Helper to safely parse JSONB fields
const parseJsonb = (value: any) => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
  return value;
};

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  subtitle: z.string().optional(),
  slug: z.string().min(1, "Le slug est requis.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Le slug doit être en minuscules, sans espaces et avec des tirets."),
  short_description: z.string().optional(),
  long_description: z.string().optional(), // Now expects HTML string from ReactQuill
  hero_image: z.string().url("L'URL de l'image d'en-tête doit être valide.").optional().or(z.literal('')),
  status: z.enum(['draft', 'published']),

  intro_title: z.string().optional(),
  intro_text: z.string().optional(), // Will be JSON string
  intro_list: z.string().optional(), // Will be JSON string
  intro_image: z.string().url("L'URL de l'image d'introduction doit être valide.").optional().or(z.literal('')),

  prestations_title: z.string().optional(),
  prestations_items: z.array(z.object({
    icon: z.string().min(1, "L'icône est requise (nom Lucide)."),
    title: z.string().min(1, "Le titre est requis."),
    description: z.string().min(1, "La description est requise."),
  })).optional(),

  process_title: z.string().optional(),
  process_steps: z.array(z.object({
    icon: z.string().min(1, "L'icône est requise (nom Lucide)."),
    name: z.string().min(1, "Le nom de l'étape est requis."),
    description: z.string().min(1, "La description de l'étape est requise."),
  })).optional(),

  results_title: z.string().optional(),
  results_stats: z.array(z.object({
    value: z.string().min(1, "La valeur est requise."),
    label: z.string().min(1, "Le label est requis."),
  })).optional(),
  results_text: z.string().optional(),
  results_cta: z.string().optional(),

  testimonials_title: z.string().optional(),
  testimonials_items: z.array(z.object({
    quote: z.string().min(1, "La citation est requise."),
    author: z.string().min(1, "L'auteur est requis."),
    company: z.string().optional(),
  })).optional(),

  seo_title: z.string().optional(),
  meta_description: z.string().optional(),
  canonical_url: z.string().url("L'URL canonique doit être valide.").optional().or(z.literal('')),
});

type ServiceFormValues = z.infer<typeof formSchema>;

const ServiceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      slug: '',
      short_description: '',
      long_description: '',
      hero_image: '',
      status: 'draft',
      intro_title: '',
      intro_text: '[]',
      intro_list: '[]',
      intro_image: '',
      prestations_title: '',
      prestations_items: [],
      process_title: '',
      process_steps: [],
      results_title: '',
      results_stats: [],
      results_text: '',
      results_cta: '',
      testimonials_title: '',
      testimonials_items: [],
      seo_title: '',
      meta_description: '',
      canonical_url: '',
    },
  });

  const { watch, setValue, control } = form;
  const title = watch('title');
  const slug = watch('slug');
  const status = watch('status');

  const { fields: prestationsFields, append: appendPrestation, remove: removePrestation } = useFieldArray({
    control,
    name: "prestations_items",
  });

  const { fields: processFields, append: appendProcessStep, remove: removeProcessStep } = useFieldArray({
    control,
    name: "process_steps",
  });

  const { fields: resultsStatsFields, append: appendResultStat, remove: removeResultStat } = useFieldArray({
    control,
    name: "results_stats",
  });

  const { fields: testimonialsFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
    control,
    name: "testimonials_items",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchService = async () => {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          showError("Erreur lors du chargement du service : " + error.message);
          navigate('/dashboard/services');
        } else if (data) {
          form.reset({
            ...data,
            intro_text: JSON.stringify(data.intro_text || []),
            intro_list: JSON.stringify(data.intro_list || []),
            prestations_items: data.prestations_items || [],
            process_steps: data.process_steps || [],
            results_stats: data.results_stats || [],
            testimonials_items: data.testimonials_items || [],
          });
        }
        setLoading(false);
      };
      fetchService();
    }
  }, [id, form, navigate]);

  useEffect(() => {
    if (!id && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [title, id, setValue]);

  const onSubmit = async (values: ServiceFormValues) => {
    setIsSubmitting(true);
    // No user_id needed as authentication is removed
    // const user = (await supabase.auth.getUser()).data.user;

    // if (!user) {
    //   showError("Vous devez être connecté pour créer ou modifier un service.");
    //   setIsSubmitting(false);
    //   return;
    // }

    const serviceData = {
      ...values,
      user_id: null, // Set user_id to null as there's no authenticated user
      intro_text: parseJsonb(values.intro_text),
      intro_list: parseJsonb(values.intro_list),
      updated_at: new Date().toISOString(),
    };

    let error = null;
    let newServiceId = id;

    if (id) {
      const { error: updateError } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id);
      error = updateError;
    } else {
      const { data, error: insertError } = await supabase
        .from('services')
        .insert(serviceData)
        .select('id')
        .single();
      error = insertError;
      if (data) newServiceId = data.id;
    }

    if (error) {
      showError("Erreur lors de la sauvegarde du service : " + error.message);
    } else {
      showSuccess("Service sauvegardé avec succès !");
      // Log activity - user_id and user_email will be null
      await supabase.from('activity_log').insert({
        user_id: null, // Set user_id to null
        user_email: null, // Set user_email to null
        action_type: id ? 'service_updated' : 'service_created',
        resource_type: 'service',
        resource_id: newServiceId,
        details: { title: values.title, status: values.status }
      });
      navigate('/dashboard/services');
    }
    setIsSubmitting(false);
  };

  const handlePreview = () => {
    if (slug && status === 'published') {
      window.open(`/services/${slug}`, '_blank');
    } else {
      showError("La prévisualisation n'est disponible que pour les services publiés. Enregistrez et publiez d'abord.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement du formulaire...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">{id ? 'Modifier le Service' : 'Créer un Nouveau Service'}</h2>
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
          {/* Basic Info */}
          <h3 className="text-xl font-bold font-poppins text-white">Informations Générales</h3>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titre du service</FormLabel>
                <FormControl>
                  <Input placeholder="Création de sites web" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Sous-titre</FormLabel>
                <FormControl>
                  <Input placeholder="Des sites professionnels pour votre entreprise" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
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
                  <Input placeholder="creation-de-sites-web" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description courte</FormLabel>
                <FormControl>
                  <Textarea placeholder="Un bref aperçu du service..." {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[80px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="long_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description longue</FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    value={field.value || ''}
                    onChange={field.onChange}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'image', 'video'],
                        ['clean']
                      ]
                    }}
                    className="min-h-[200px] bg-white text-dark-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hero_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">URL de l'image d'en-tête (ou Lucide:NomIcone)</FormLabel>
                <FormControl>
                  <Input placeholder="/public/hero-service.jpg ou Lucide:Globe" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
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

          {/* Intro Section */}
          <h3 className="text-xl font-bold font-poppins text-white mt-10">Section Introduction</h3>
          <FormField
            control={form.control}
            name="intro_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titre d'introduction</FormLabel>
                <FormControl>
                  <Input placeholder="Votre site web actuel vous coûte des clients ?" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Texte d'introduction (JSON Array de paragraphes)</FormLabel>
                <FormControl>
                  <Textarea placeholder='["Paragraphe 1", "Paragraphe 2"]' {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[100px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro_list"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Liste d'introduction (JSON Array de points)</FormLabel>
                <FormControl>
                  <Textarea placeholder='["Point 1", "Point 2"]' {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[100px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">URL de l'image d'introduction</FormLabel>
                <FormControl>
                  <Input placeholder="/public/intro-image.jpg" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Prestations Section */}
          <h3 className="text-xl font-bold font-poppins text-white mt-10">Section Prestations</h3>
          <FormField
            control={form.control}
            name="prestations_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titre des prestations</FormLabel>
                <FormControl>
                  <Input placeholder="Nos Solutions de Conception et Développement Web" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            {prestationsFields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-4 p-4 border border-gray-700 rounded-lg relative">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => removePrestation(index)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
                <FormField
                  control={form.control}
                  name={`prestations_items.${index}.icon`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Icône (nom Lucide)</FormLabel>
                      <FormControl>
                        <Input placeholder="Monitor" {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`prestations_items.${index}.title`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Site Vitrine Professionnel" {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`prestations_items.${index}.description`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Présentez votre entreprise avec style et efficacité." {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[60px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-lg"
              onClick={() => appendPrestation({ icon: '', title: '', description: '' })}
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Ajouter une prestation
            </Button>
          </div>

          {/* Process Section */}
          <h3 className="text-xl font-bold font-poppins text-white mt-10">Section Processus</h3>
          <FormField
            control={form.control}
            name="process_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titre du processus</FormLabel>
                <FormControl>
                  <Input placeholder="Comment Nous Créons Votre Site Web" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            {processFields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-4 p-4 border border-gray-700 rounded-lg relative">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => removeProcessStep(index)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
                <FormField
                  control={form.control}
                  name={`process_steps.${index}.icon`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Icône (nom Lucide)</FormLabel>
                      <FormControl>
                        <Input placeholder="Search" {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`process_steps.${index}.name`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nom de l'étape</FormLabel>
                      <FormControl>
                        <Input placeholder="Découverte & Stratégie" {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`process_steps.${index}.description`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Description de l'étape</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Analyse de vos besoins et objectifs." {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[60px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-lg"
              onClick={() => appendProcessStep({ icon: '', name: '', description: '' })}
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Ajouter une étape de processus
            </Button>
          </div>

          {/* Results Section */}
          <h3 className="text-xl font-bold font-poppins text-white mt-10">Section Résultats</h3>
          <FormField
            control={form.control}
            name="results_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titre des résultats</FormLabel>
                <FormControl>
                  <Input placeholder="Des Sites Web Qui Génèrent des Résultats" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            {resultsStatsFields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-4 p-4 border border-gray-700 rounded-lg relative">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => removeResultStat(index)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
                <FormField
                  control={form.control}
                  name={`results_stats.${index}.value`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Valeur statistique</FormLabel>
                      <FormControl>
                        <Input placeholder="650+" {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`results_stats.${index}.label`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Label statistique</FormLabel>
                      <FormControl>
                        <Input placeholder="projets réalisés" {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-lg"
              onClick={() => appendResultStat({ value: '', label: '' })}
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Ajouter une statistique de résultat
            </Button>
          </div>
          <FormField
            control={form.control}
            name="results_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Texte des résultats</FormLabel>
                <FormControl>
                  <Textarea placeholder="Des dizaines de clients satisfaits..." {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[100px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="results_cta"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">CTA des résultats</FormLabel>
                <FormControl>
                  <Input placeholder="👉 Étude de cas disponible sur demande" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Testimonials Section */}
          <h3 className="text-xl font-bold font-poppins text-white mt-10">Section Témoignages</h3>
          <FormField
            control={form.control}
            name="testimonials_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titre des témoignages</FormLabel>
                <FormControl>
                  <Input placeholder="Ils Nous Font Confiance" {...field} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            {testimonialsFields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-4 p-4 border border-gray-700 rounded-lg relative">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => removeTestimonial(index)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
                <FormField
                  control={form.control}
                  name={`testimonials_items.${index}.quote`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Citation</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Grâce à Wendooka, notre site e-commerce..." {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent min-h-[60px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`testimonials_items.${index}.author`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Auteur</FormLabel>
                      <FormControl>
                        <Input placeholder="Client Satisfait" {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`testimonials_items.${index}.company`}
                  render={({ field: itemField }) => (
                    <FormItem>
                      <FormLabel className="text-white">Entreprise</FormLabel>
                      <FormControl>
                        <Input placeholder="Entreprise X" {...itemField} className="bg-dark-black border-gray-600 text-white focus:border-lime-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full border-lime-accent text-white hover:bg-lime-accent hover:text-dark-black font-bold rounded-lg"
              onClick={() => appendTestimonial({ quote: '', author: '', company: '' })}
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Ajouter un témoignage
            </Button>
          </div>

          {/* SEO Section */}
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

          <Button type="submit" className="w-full bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg mt-10" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {id ? 'Mettre à jour le service' : 'Créer le service'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ServiceForm;