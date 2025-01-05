// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';  // Ajoutez cet import

export default function Register() {
  const { register } = useAuth();  // Utilisez le hook useAuth
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
        const success = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
  
        if (success) {
          navigate('/login');
        } else {
          setError('Erreur lors de l\'inscription');
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Erreur de connexion');
      }
    };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Inscription
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
            htmlFor="username"
          >
            Nom d&apos;utilisateur
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>

        <div>
          <label 
            className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>

        <div>
          <label 
            className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>

        <div>
          <label 
            className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
            htmlFor="confirmPassword"
          >
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          S&apos;inscrire
        </button>
      </form>

      <p className={`mt-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Déjà un compte ?{' '}
        <Link to="/login" className="text-green-500 hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}