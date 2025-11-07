"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && session) {
      // User is authenticated, redirect to dashboard
      navigate('/dashboard', { replace: true });
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-lime-accent" />
        <span className="ml-2">Chargement de l'authentification...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-black p-4">
      <div className="w-full max-w-md bg-dark-gray p-8 rounded-lg shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold font-poppins text-white text-center mb-8">Connexion au Tableau de Bord</h1>
        <Auth
          supabaseClient={supabase}
          providers={[]} // No third-party providers for now
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--lime-accent))', // Using your lime-accent color
                  brandAccent: 'hsl(var(--lime-accent))',
                  defaultButtonBackground: 'hsl(var(--lime-accent))',
                  defaultButtonBackgroundHover: 'hsl(var(--lime-accent) / 0.9)',
                  defaultButtonBorder: 'hsl(var(--lime-accent))',
                  defaultButtonText: 'hsl(var(--dark-black))',
                  inputBackground: 'hsl(var(--dark-black))',
                  inputBorder: 'hsl(var(--gray-600))',
                  inputBorderHover: 'hsl(var(--lime-accent))',
                  inputText: 'hsl(var(--white))',
                  inputLabelText: 'hsl(var(--white))',
                  anchorTextColor: 'hsl(var(--lime-accent))', // Corrected property name
                  anchorTextHoverColor: 'hsl(var(--lime-accent) / 0.8)', // Corrected property name
                },
              },
            },
          }}
          theme="dark" // Using dark theme to match your app's aesthetic
          redirectTo={window.location.origin + '/dashboard'} // Redirect after successful auth
        />
      </div>
    </div>
  );
};

export default Login;