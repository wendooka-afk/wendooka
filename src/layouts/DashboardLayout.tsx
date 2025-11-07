import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, FileText, Image, Settings, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { useSession } from '@/components/SessionContextProvider'; // Import useSession

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSession(); // Use the session context

  useEffect(() => {
    if (!isLoading && !session) {
      // If not loading and no session, redirect to login
      navigate('/login', { replace: true });
    }
  }, [session, isLoading, navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Erreur lors de la déconnexion : " + error.message);
    } else {
      showSuccess("Vous avez été déconnecté.");
      navigate('/login'); // Redirect to login page after sign out
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-lime-accent" />
        <span className="ml-2">Chargement du tableau de bord...</span>
      </div>
    );
  }

  if (!session) {
    // This case is handled by the useEffect redirect, but good for explicit clarity
    return null; 
  }

  return (
    <div className="flex min-h-screen bg-dark-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-gray p-6 flex flex-col border-r border-gray-800">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-lime-accent rounded-full p-2 flex items-center justify-center">
            <img src="/public/placeholder-logo.svg" alt="Wendooka Logo" className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
        </div>
        <nav className="flex-grow space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-lime-accent hover:text-dark-black transition-colors">
            <Home className="h-5 w-5" />
            <span>Tableau de bord</span>
          </Link>
          <Link to="/dashboard/pages" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-lime-accent hover:text-dark-black transition-colors">
            <FileText className="h-5 w-5" />
            <span>Pages</span>
          </Link>
          <Link to="/dashboard/media" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-lime-accent hover:text-dark-black transition-colors">
            <Image className="h-5 w-5" />
            <span>Médiathèque</span>
          </Link>
          <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-lime-accent hover:text-dark-black transition-colors">
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>
        </nav>
        <Button 
          onClick={handleSignOut} 
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg mt-6"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Déconnexion
        </Button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-dark-gray p-6 border-b border-gray-800 flex items-center justify-between">
          <h1 className="text-3xl font-bold font-poppins">Tableau de bord</h1>
          {/* User info or other header elements can go here */}
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet /> {/* This is where nested routes will render */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;