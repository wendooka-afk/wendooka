import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  status: 'draft' | 'published' | 'scheduled';
  published_at: string | null;
  category_id: string;
  user_id: string;
  seo_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    slug: string;
  };
  tags?: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface UseBlogReturn {
  posts: BlogPost[];
  loading: boolean;
  error: PostgrestError | null;
  fetchPosts: () => Promise<void>;
  fetchPost: (id: string) => Promise<BlogPost | null>;
  createPost: (data: Partial<BlogPost>) => Promise<BlogPost | null>;
  updatePost: (id: string, data: Partial<BlogPost>) => Promise<BlogPost | null>;
  deletePost: (id: string) => Promise<void>;
  updateTags: (postId: string, tags: string[]) => Promise<void>;
}

export const useBlog = (): UseBlogReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:categories(name, slug),
        tags:post_tags(
          tag:tags(id, name, slug)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      setError(error);
    } else if (data) {
      // Transformer les données pour un format plus facile à utiliser
      const transformedPosts = data.map(post => ({
        ...post,
        tags: post.tags?.map((pt: any) => pt.tag)
      }));
      setPosts(transformedPosts);
    }

    setLoading(false);
  };

  const fetchPost = async (id: string): Promise<BlogPost | null> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:categories(name, slug),
        tags:post_tags(
          tag:tags(id, name, slug)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      setError(error);
      return null;
    }

    if (data) {
      return {
        ...data,
        tags: data.tags?.map((pt: any) => pt.tag)
      };
    }

    return null;
  };

  const createPost = async (data: Partial<BlogPost>): Promise<BlogPost | null> => {
    const { data: newPost, error } = await supabase
      .from('blog_posts')
      .insert([data])
      .select()
      .single();

    if (error) {
      setError(error);
      return null;
    }

    return newPost;
  };

  const updatePost = async (id: string, data: Partial<BlogPost>): Promise<BlogPost | null> => {
    const { data: updatedPost, error } = await supabase
      .from('blog_posts')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      setError(error);
      return null;
    }

    return updatedPost;
  };

  const deletePost = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      setError(error);
    }
  };

  const updateTags = async (postId: string, tagNames: string[]): Promise<void> => {
    // 1. Supprimer tous les tags existants pour ce post
    const { error: deleteError } = await supabase
      .from('post_tags')
      .delete()
      .eq('post_id', postId);

    if (deleteError) {
      setError(deleteError);
      return;
    }

    if (tagNames.length === 0) return;

    // 2. Créer ou récupérer les tags
    const tagPromises = tagNames.map(async (name) => {
      const { data, error } = await supabase
        .from('tags')
        .select('id')
        .eq('name', name)
        .single();

      if (data) return data.id;

      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const { data: newTag, error: createError } = await supabase
        .from('tags')
        .insert([{ name, slug }])
        .select('id')
        .single();

      if (createError) throw createError;
      return newTag.id;
    });

    const tagIds = await Promise.all(tagPromises);

    // 3. Créer les associations post-tags
    const postTags = tagIds.map(tagId => ({
      post_id: postId,
      tag_id: tagId,
    }));

    const { error: insertError } = await supabase
      .from('post_tags')
      .insert(postTags);

    if (insertError) {
      setError(insertError);
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    updateTags,
  };
};

export default useBlog;