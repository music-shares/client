/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getMusicList } from '../services/musicService';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext'; 

export default function Home() {
    const { isDarkMode } = useTheme();
    const { user } = useAuth();
    const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer(); // Ajoutez togglePlay ici
    const [musics, setMusics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getMusicList(token);
                setMusics(data.files || []);
            } catch (err) {
                setError('Erreur lors du chargement des musiques');
            } finally {
                setLoading(false);
            }
        };

        fetchMusics();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-green-500">Chargement...</div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 text-center">
            {error}
        </div>
    );

    const handleTrackClick = (music) => {
        if (currentTrack?.name === music.name) {
          // Si c'est la même piste, basculer play/pause dans le Player
          togglePlay();
        } else {
          // Sinon, jouer la nouvelle piste
          playTrack(music);
        }
      };
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Bibliothèque Musicale
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {musics.map((music, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${
                                isDarkMode 
                                    ? 'bg-gray-800 hover:bg-gray-700' 
                                    : 'bg-white hover:bg-gray-100'
                            } ${currentTrack?.name === music.name ? 'border-2 border-green-500' : ''}`}
                            onClick={() => handleTrackClick(music)} // Modifié ici
                        >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-green-500 font-medium">{music.name}</h3>
                                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                    {(music.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            {currentTrack?.name === music.name ? (
                                <Pause className="w-6 h-6 text-green-500" />
                            ) : (
                                <Play className="w-6 h-6 text-green-500" />
                            )}
                        </div>
                        {music.url && (
                            <audio 
                                className="w-full mt-2" 
                                controls
                                src={music.url}
                            />
                        )}
                    </div>
                ))}
            </div>

            {musics.length === 0 && (
                <div className="text-center py-10">
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Aucune musique disponible
                    </p>
                </div>
            )}
        </div>
    );
}