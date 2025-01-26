import { useState } from 'react';
import { Menu, X, Music, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Ajoutez cet import

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();  // Récupérer l'utilisateur
    const { isAuthenticated, logout } = useAuth();

    // Fonction pour vérifier si c'est un admin
    const isAdmin = user?.email === "drogogaming.com@gmail.com"; // ou votre email admin

    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo et titre */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Music className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold glitch-hover">The Crow Store</span>
                        </Link>
                    </div>

                    {/* Navigation desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/">
                            <Button variant="ghost" className="text-sm">
                                Accueil
                            </Button>
                        </Link>
                        <Link to="/tracks">
                            <Button variant="ghost" className="text-sm">
                                Pistes
                            </Button>
                        </Link>
                        {isAdmin && (  // Condition pour afficher le bouton Upload
                            <Link to="/admin">
                                <Button variant="ghost" className="text-sm gap-2">
                                    <Upload className="w-4 h-4" />
                                    Upload
                                </Button>
                            </Link>
                        )}
                        {!isAuthenticated ? (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" className="text-sm">
                                    Connexion
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="ghost" className="text-sm">
                                    Inscription
                                </Button>
                            </Link>
                        </>
                        ) : (
                        <Button onClick={logout} variant="ghost" className="text-sm">
                            Déconnexion
                        </Button>
                        )}
                    </div>

                    {/* Bouton menu mobile */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Menu principal"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Menu mobile */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link to="/" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full text-left">
                                    Accueil
                                </Button>
                            </Link>
                            {isAdmin && (  // Condition pour afficher le bouton Upload
                                <Link to="/admin" onClick={() => setIsOpen(false)}>
                                    <Button variant="ghost" className="w-full text-left gap-2">
                                        <Upload className="w-4 h-4" />
                                        Upload
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;