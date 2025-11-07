# Wendooka - Agence Digitale

Bienvenue sur le dépôt du site web de Wendooka, une agence digitale spécialisée dans la création de sites web, le design graphique, l'UI/UX design et le marketing digital. Ce projet est une application web moderne construite avec React, TypeScript, Tailwind CSS et Shadcn/ui, avec Supabase comme backend pour la gestion de contenu et l'authentification.

## Table des matières

1.  [Aperçu du projet](#1-aperçu-du-projet)
2.  [Fonctionnalités](#2-fonctionnalités)
3.  [Technologies Utilisées](#3-technologies-utilisées)
4.  [Démarrage Rapide](#4-démarrage-rapide)
    *   [Prérequis](#prérequis)
    *   [Installation](#installation)
    *   [Variables d'environnement](#variables-denvironnement)
    *   [Configuration de la base de données Supabase](#configuration-de-la-base-de-données-supabase)
5.  [Exécution de l'application](#5-exécution-de-lapplication)
6.  [Structure du projet](#6-structure-du-projet)
7.  [Déploiement](#7-déploiement)

---

## 1. Aperçu du projet

Ce site web est la vitrine de l'agence Wendooka, présentant ses services, son portfolio, son blog et permettant aux clients de prendre contact. Il inclut également un tableau de bord d'administration pour gérer dynamiquement le contenu des pages, des articles de blog, des projets et des services.

## 2. Fonctionnalités

*   **Pages Statiques et Dynamiques** : Pages d'accueil, À Propos, Contact, Politique de Confidentialité, Conditions d'Utilisation, ainsi que des pages dynamiques gérées via le tableau de bord.
*   **Section Services** : Présentation détaillée des services offerts par l'agence.
*   **Portfolio** : Affichage des projets réalisés avec des filtres par catégorie.
*   **Blog** : Articles de blog avec gestion des publications.
*   **Formulaire de Contact** : Permet aux visiteurs d'envoyer des messages à l'agence.
*   **Tableau de Bord d'Administration** :
    *   Gestion des pages (création, modification, suppression, publication).
    *   Gestion des articles de blog.
    *   Gestion des projets du portfolio.
    *   Gestion des services.
    *   Médiathèque pour l'upload et la gestion des fichiers.
*   **Design Responsive** : Optimisé pour tous les appareils (mobiles, tablettes, ordinateurs de bureau).
*   **SEO Friendly** : Options SEO pour chaque page et article.

## 3. Technologies Utilisées

*   **Frontend**:
    *   [React](https://react.dev/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Vite](https://vitejs.dev/)
    *   [React Router](https://reactrouter.com/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Shadcn/ui](https://ui.shadcn.com/) (composants UI)
    *   [Lucide React](https://lucide.dev/icons/) (icônes)
    *   [Zod](https://zod.dev/) (validation de schéma)
    *   [React Hook Form](https://react-hook-form.com/) (gestion de formulaires)
    *   [Sonner](https://sonner.emilkowal.ski/) (notifications toast)
*   **Backend**:
    *   [Supabase](https://supabase.com/) (Base de données PostgreSQL, Authentification, Stockage)

## 4. Démarrage Rapide

Suivez ces instructions pour configurer et exécuter le projet en local.

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

*   [Node.js](https://nodejs.org/en/) (version 18 ou supérieure)
*   [npm](https://www.npmjs.com/) (généralement inclus avec Node.js), [Yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)

### Installation

1.  **Clonez le dépôt** :
    ```bash
    git clone <URL_DE_VOTRE_DEPOT>
    cd wendooka-website
    ```
2.  **Installez les dépendances** :
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet et ajoutez-y vos clés Supabase :

```env
VITE_SUPABASE_URL="https://gfwibbxzokrihpvdlbvz.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmd2liYnh6b2tyaWhwdmRsYnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTk4OTYsImV4cCI6MjA3NzMzNTg5Nn0.aFD-pqNhTmywgUmZeO_DRqaKd8vIEU8nB0zgr92l_KY"
```

**Important** : Remplacez les valeurs par vos propres clés Supabase si vous utilisez un nouveau projet.

### Configuration de la base de données Supabase

Ce projet s'appuie sur plusieurs tables Supabase pour la gestion de contenu. Vous devrez configurer votre base de données Supabase avec les schémas suivants et activer la sécurité au niveau des lignes (RLS) pour toutes les tables.

**Tables principales :**

*   `profiles` (pour les informations utilisateur)
*   `pages` (pour les pages dynamiques du site)
*   `posts` (pour les articles de blog)
*   `projects` (pour les éléments du portfolio)
*   `services` (pour les descriptions de services)
*   `activity_log` (pour le suivi des actions dans le tableau de bord)

**Exemple de création de table et de politiques RLS (pour `pages`) :**

```sql
-- Créer la table pages
CREATE TABLE public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'scheduled'
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  meta_description TEXT,
  canonical_url TEXT
);

-- Activer RLS (OBLIGATOIRE)
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Public users can view published pages" ON public.pages
FOR SELECT USING (status = 'published');

CREATE POLICY "Admin/Editor can view all pages" ON public.pages
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role_id IN (SELECT roles.id FROM roles WHERE roles.role_name = ANY(ARRAY['admin', 'editor']))));

CREATE POLICY "Admin/Editor can manage pages" ON public.pages
FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role_id IN (SELECT roles.id FROM roles WHERE roles.role_name = ANY(ARRAY['admin', 'editor']))));
```

Vous devrez appliquer des schémas similaires et des politiques RLS appropriées pour `posts`, `projects`, `services`, `profiles` et `activity_log` en vous basant sur les exemples fournis dans la documentation Supabase et les fichiers de votre projet.

**Bucket de stockage Supabase :**

Créez un bucket de stockage nommé `media` dans Supabase pour la médiathèque. Assurez-vous que les politiques RLS permettent l'upload et la suppression par les utilisateurs authentifiés, et la lecture publique si nécessaire.

## 5. Exécution de l'application

Pour démarrer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

L'application sera accessible à l'adresse `http://localhost:8080`.

## 6. Structure du projet

Le projet suit une structure standard pour les applications React/Vite :

```
src/
├── components/             # Composants UI réutilisables (shadcn/ui et custom)
│   ├── ui/                 # Composants shadcn/ui
│   └── ...                 # Composants custom (Header, Footer, HeroSection, etc.)
├── data/                   # Données statiques (ex: teamData)
├── hooks/                  # Hooks React personnalisés
├── integrations/           # Intégrations avec des services tiers (ex: Supabase client)
├── layouts/                # Layouts de page (ex: DashboardLayout)
├── lib/                    # Fonctions utilitaires (ex: cn pour Tailwind)
├── pages/                  # Pages de l'application (Index, Services, Blog, Contact, Dashboard, etc.)
│   └── dashboard/          # Pages spécifiques au tableau de bord
├── utils/                  # Utilitaires divers (ex: toast notifications)
├── App.tsx                 # Configuration des routes React Router
├── globals.css             # Styles globaux et Tailwind CSS
├── main.tsx                # Point d'entrée de l'application
└── vite-env.d.ts           # Définitions de types Vite
public/                     # Fichiers statiques (images, favicons, etc.)
├── placeholder-logo.svg
├── hero-main.png
└── ...
```

## 7. Déploiement

Ce projet est configuré pour être déployé sur des plateformes comme Vercel. Le fichier `vercel.json` à la racine du projet contient une configuration de réécriture pour gérer le routage côté client.

Pour déployer :

1.  Connectez votre dépôt GitHub à Vercel (ou à une autre plateforme de déploiement).
2.  Assurez-vous que les variables d'environnement Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) sont configurées dans les paramètres de votre déploiement.
3.  Lancez le déploiement.

---

N'hésitez pas à explorer le code et à apporter des modifications !