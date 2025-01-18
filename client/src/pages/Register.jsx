import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas"
      });
      setLoading(false);
      return;
    }

    try {
      const success = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (success) {
        toast({
          title: "Inscription réussie",
          description: "Vous pouvez maintenant vous connecter"
        });
        navigate('/login');
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Erreur lors de l'inscription"
        });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
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
          <h2 className="text-3xl font-bold text-green-500">Inscription</h2>
          <p className="mt-2 text-gray-400">Créez votre compte</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-green-500/20 focus:border-green-500"
              />
            </div>
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
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
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
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </Button>

          <p className="text-center text-gray-400">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-green-500 hover:text-green-400">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}