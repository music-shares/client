// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    try {
      const response = await fetch('votre-api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Connexion
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Se connecter
        </button>
      </form>

      <p className={`mt-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Pas encore de compte ?{' '}
        <Link to="/register" className="text-green-500 hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}