import { useState, useEffect } from 'react';
import { AudioPlayer } from "@/components/AudioPlayer";
import { getMusicList } from '@/services/musicService';
import { Button } from "@/components/ui/button";
import { Loader2, Music } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [randomTrack, setRandomTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await getMusicList();
                const formattedTracks = data.files.map(file => ({
                    url: file.url,
                    name: file.name,
                    artist: 'drogothecrow',
                    size: file.size,
                    tags: file.tags || {}
                }));
                const randomIndex = Math.floor(Math.random() * formattedTracks.length);
                setRandomTrack(formattedTracks[randomIndex]);
            } catch (err) {
                setError('Erreur lors du chargement des musiques');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);

    return (
        <div className="min-h-screen bg-background pt-16">
            {/* Hero Section */}
            <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glitch-hover">
                        The Crow Store
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Découvrez mon univers musical
                    </p>
                    <Button 
                        onClick={() => navigate('/tracks')}
                        className="gap-2"
                    >
                        <Music className="w-4 h-4" />
                        Voir toutes les pistes
                    </Button>
                </div>
            </section>

            {/* Music Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        <span className="text-primary">Piste</span> Aléatoire
                    </h2>
                    
                    {loading && (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Chargement des pistes...
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-red-500">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-8 max-w-3xl mx-auto">
                        {!loading && !error && randomTrack && (
                            <AudioPlayer
                                trackUrl={randomTrack.url}
                                trackName={randomTrack.name}
                                artistName={randomTrack.artist}
                                tags={randomTrack.tags}
                            />
                        )}

                        {!loading && !randomTrack && (
                            <div className="text-center text-muted-foreground">
                                Aucune musique disponible
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Index;