import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { showError } from '@/utils/toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/dashboard', { replace: true });
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showError("Identifiants incorrects. Veuillez réessayer.");
    } else {
      navigate('/dashboard', { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-black px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-poppins text-white mb-2">Wendooka</h1>
          <p className="text-gray-400">Connectez-vous au tableau de bord</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-dark-gray p-8 rounded-2xl border border-gray-800">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Adresse email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wendooka.com"
              required
              className="bg-dark-black border-gray-700 text-white focus:border-lime-accent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-dark-black border-gray-700 text-white focus:border-lime-accent"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-accent text-dark-black hover:bg-lime-accent/90 font-bold rounded-xl py-6"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Se connecter'}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          <a href="/" className="hover:text-lime-accent transition-colors">
            Retour au site
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
