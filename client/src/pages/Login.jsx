import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect"
        });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur est survenue"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-zinc-900 p-8 rounded-xl border border-green-500/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-500">Connexion</h2>
          <p className="mt-2 text-gray-400">Connectez-vous à votre compte</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-green-500/20 focus:border-green-500"
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-green-500/20 focus:border-green-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>

          <p className="text-center text-gray-400">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="text-green-500 hover:text-green-400"
            >
              S&apos;inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}