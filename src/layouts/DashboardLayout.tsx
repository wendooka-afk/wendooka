import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, FileText, Image, Settings, LogOut, Newspaper, Briefcase, LayoutTemplate } from 'lucide-react'; // Added LayoutTemplate icon
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Erreur lors de la déconnexion : " + error.message);
    } else {
      showSuccess("Vous avez été déconnecté.");
      navigate('/'); 
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-gray p-6 flex flex-col border-r border-gray-800">
        <div className="flex items-center gap-3 mb-10">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="bg-lime-accent rounded-full p-2 flex items-center justify-center">
              <img src="/public/placeholder-logo.svg" alt="Wendooka Logo" className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold font-poppins text-white">Wendooka</span>
          </Link>
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
          <Link to="/dashboard/blog" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-lime-accent hover:text-dark-black transition-colors">
            <Newspaper className="h-5 w-5" />
            <span>Articles de Blog</span>
          </Link>
          <Link to="/dashboard/projects" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-lime-accent hover:text-dark-black transition-colors">
            <Briefcase className="h-5 w-5" />
            <span>Projets</span>
          </Link>
          <Link to="/dashboard/services" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-lime-accent hover:text-dark-black transition-colors">
            <LayoutTemplate className="h-5 w-5" />
            <span>Services</span>
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
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;