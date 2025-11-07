"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Upload, Trash2, File } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface MediaFile {
  name: string;
  id: string; // Supabase storage items have an id
  fullPath: string;
  url: string;
}

const BUCKET_NAME = 'media'; // Assurez-vous d'avoir un bucket public nommé 'media' dans Supabase Storage

const MediaLibrary: React.FC = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) {
      showError("Erreur lors du chargement des fichiers : " + error.message);
    } else if (data) {
      const fetchedFiles: MediaFile[] = data.map((file) => ({
        name: file.name,
        id: file.id,
        fullPath: file.name, // Supabase list returns name as full path for root files
        url: supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name).data.publicUrl,
      }));
      setFiles(fetchedFiles);
    }
    setLoading(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setUploading(true);
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(uploadedFile.name, uploadedFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      showError("Erreur lors de l'upload du fichier : " + error.message);
    } else {
      showSuccess("Fichier uploadé avec succès !");
      fetchFiles(); // Actualise la liste des fichiers
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Efface l'input
      }
    }
    setUploading(false);
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${fileName}" ?`)) {
      return;
    }

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);

    if (error) {
      showError("Erreur lors de la suppression du fichier : " + error.message);
    } else {
      showSuccess("Fichier supprimé avec succès !");
      fetchFiles(); // Actualise la liste des fichiers
    }
  };

  const isImage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-poppins text-white">Médiathèque</h2>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            ref={fileInputRef}
            id="file-upload"
            disabled={uploading}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-lg"
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Upload className="h-5 w-5 mr-2" />
            )}
            Uploader un fichier
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Chargement des fichiers...
        </div>
      ) : files.length === 0 ? (
        <p className="text-gray-400 text-center">Aucun fichier trouvé. Uploadez-en un nouveau !</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <Card key={file.id} className="bg-dark-gray border-gray-800 rounded-lg overflow-hidden flex flex-col group">
              <div className="relative w-full h-40 bg-gray-700 flex items-center justify-center overflow-hidden">
                {isImage(file.name) ? (
                  <img src={file.url} alt={file.name} className="object-cover w-full h-full" />
                ) : (
                  <File className="h-16 w-16 text-gray-400" />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteFile(file.fullPath)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <p className="text-sm font-medium text-white truncate mb-2">{file.name}</p>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-accent hover:underline text-sm"
                >
                  Voir le fichier
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;