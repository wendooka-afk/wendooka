"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useBlog } from '@/hooks/use-blog';
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
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Loader2, Eye, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  slug: z.string().min(1, "Le slug est requis.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Le slug doit être en minuscules, sans espaces et avec des tirets."),
  category_id: z.string().min(1, "La catégorie est requise."),
  author: z.string().optional(),
  featured_image: z.string().url("L'URL de l'image doit être valide.").optional().or(z.literal('')),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Le contenu est requis."),
  status: z.enum(['draft', 'published', 'scheduled']),
  published_at: z.date().optional().nullable(),
  seo_title: z.string().optional(),
  meta_description: z.string().optional(),
  tags: z.array(z.string())
});

type BlogPostFormValues = z.infer<typeof formSchema>;

const BlogPostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { updateTags } = useBlog();

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      category_id: '',
      author: '',
      featured_image: '',
      excerpt: '',
      content: '',
      status: 'draft',
      published_at: null,
      seo_title: '',
      meta_description: '',
      tags: [],
    },
  });

  const { watch, setValue } = form;
  const title = watch('title');
  const slug = watch('slug');
  const status = watch('status');

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (data) setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchPost = async () => {
        const { data: post, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:categories(id, name, slug),
            tags:post_tags(
              tag:tags(name)
            )
          `)
          .eq('id', id)
          .single();

        if (error) {
          showError("Erreur lors du chargement de l'article : " + error.message);
          navigate('/dashboard/blog');
        } else if (post) {
          form.reset({
            ...post,
            category_id: post.category?.id,
            published_at: post.published_at ? new Date(post.published_at) : null,
          });
          setSelectedTags(post.tags?.map(t => t.tag.name) || []);
        }
        setLoading(false);
      };
      fetchPost();
    }
  }, [id, form, navigate]);

  useEffect(() => {
    if (!id && title) {
      const generatedSlug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');
      setValue('slug', generatedSlug);
    }
  }, [id, title, setValue]);

  const handleTagAdd = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags([...selectedTags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (values: BlogPostFormValues) => {
    setIsSubmitting(true);
    // No user_id needed as authentication is removed
    // const user = (await supabase.auth.getUser()).data.user;

    try {
      let data;
      const postData = {
        ...values,
        user_id: null, // Set user_id to null as there's no authenticated user
        published_at: values.status === 'scheduled' && values.published_at 
          ? values.published_at.toISOString() 
          : (values.status === 'published' ? new Date().toISOString() : null),
        updated_at: new Date().toISOString(),
      };

      if (id) {
        // Update existing post
        const { data: updatedPost, error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        data = updatedPost;

        // Update tags
        await updateTags(id, selectedTags);
        showSuccess("Article mis à jour avec succès !");
      } else {
        // Create new post
        const { data: newPost, error } = await supabase
          .from('blog_posts')
          .insert([{
            ...postData,
            created_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (error) throw error;
        data = newPost;

        // Add tags
        await updateTags(newPost.id, selectedTags);
        showSuccess("Article créé avec succès !");
      }

      navigate('/dashboard/blog');

    } catch (error: any) {
      console.error('Error:', error);
      showError("Une erreur est survenue lors de l'enregistrement : " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    if (slug && status === 'published') {
      window.open(`/blog/${slug}`, '_blank');
    } else {
      showError("La prévisualisation n'est disponible que pour les articles publiés. Enregistrez et publiez d'abord.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6 space-y-6">
          {/* Titre */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Titre de l'article..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="mon-article..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Featured Image */}
          <FormField
            control={form.control}
            name="featured_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image à la une</FormLabel>
                <FormControl>
                  <Input placeholder="URL de l'image..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 flex-wrap mb-2">
              {selectedTags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleTagRemove(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                placeholder="Ajouter un tag"
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
              />
              <Button type="button" variant="outline" onClick={handleTagAdd}>
                Ajouter
              </Button>
            </div>
          </div>

          {/* Excerpt */}
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extrait</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Un court résumé de l'article..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    value={field.value}
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
                    className="min-h-[300px] bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          {/* SEO Title */}
          <FormField
            control={form.control}
            name="seo_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre SEO</FormLabel>
                <FormControl>
                  <Input placeholder="Titre optimisé pour les moteurs de recherche..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Meta Description */}
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description pour les moteurs de recherche..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status and Publication Date */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="scheduled">Programmé</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('status') === 'scheduled' && (
              <FormField
                control={form.control}
                name="published_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de publication</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              !field.value && "text-muted-foreground"
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          {/* Preview button - only for published posts */}
          {status === 'published' && slug && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
            >
              <Eye className="w-4 h-4 mr-2" />
              Prévisualiser
            </Button>
          )}
          
          {/* Cancel button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard/blog')}
          >
            Annuler
          </Button>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : id ? (
              'Mettre à jour'
            ) : (
              'Créer'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostForm;