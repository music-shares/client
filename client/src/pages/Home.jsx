/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getCatalogedMusic, getStreamUrl } from '@/services/musicService';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function Home() {
    const { isDarkMode } = useTheme();
    const { user } = useAuth();
    const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTracks = async () => {
            try {
                const { files } = await getCatalogedMusic();
                console.log('Pistes formatées:', files); // Debug
                setTracks(files);
            } catch (err) {
                console.error('Erreur de chargement:', err);
                setError("Impossible de charger la bibliothèque");
            } finally {
                setLoading(false);
            }
        };
    
        loadTracks();
    }, []);

    const handleTrackClick = (track) => {
        if (currentTrack?.id === track.id) {
            togglePlay();
        } else {
            playTrack(track);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-green-500">Chargement de votre bibliothèque...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Bibliothèque Musicale
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track) => (
                <div
                    key={track.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                    } ${currentTrack?.id === track.id ? 'border-2 border-green-500' : ''}`}
                    onClick={() => handleTrackClick(track)}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-green-500 font-medium">{track.title}</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {track.artist}
                            </p>
                            {track.tags && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {track.tags}
                                </p>
                            )}
                        </div>
                        {currentTrack?.id === track.id && isPlaying ? (
                            <Pause className="w-6 h-6 text-green-500" />
                        ) : (
                            <Play className="w-6 h-6 text-green-500" />
                        )}
                    </div>
                </div>
            ))}
            </div>

            {tracks.length === 0 && (
                <div className="text-center py-10">
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Votre bibliothèque est vide
                    </p>
                </div>
            )}
        </div>
    );
}