// src/components/layout/Header.jsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800">
      <Link to="/" className="text-2xl font-bold text-green-500">
        Music Stream
      </Link>
      <div className="flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="bg-green-600 px-6 py-2 rounded-md text-white">
              Connexion
            </Link>
            <Link to="/register" className="border border-green-500 text-green-500 px-6 py-2 rounded-md">
              Inscription
            </Link>
          </>
        ) : (
          <button onClick={logout} className="text-gray-400">
            Déconnexion
          </button>
        )}
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-800">
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-gray-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
}