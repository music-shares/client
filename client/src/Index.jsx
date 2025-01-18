import { useState, useEffect } from 'react';
import { AudioPlayer } from "@/components/AudioPlayer";
import { getMusicList } from '@/services/musicService';
import { Button } from "@/components/ui/button";
import { Loader2, Music } from "lucide-react";

const Index = () => {
    const [tracks, setTracks] = useState([]);
    const [randomTrack, setRandomTrack] = useState(null);
    const [showAllTracks, setShowAllTracks] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await getMusicList();
                // Transformer les données de MinIO en format attendu par AudioPlayer
                const formattedTracks = data.files.map(file => ({
                    url: file.url,
                    name: file.name,
                    artist: 'drogothecrow',
                    size: file.size
                }));
                setTracks(formattedTracks);
                // Sélectionner une piste aléatoire
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

    const toggleTracksView = () => {
        setShowAllTracks(!showAllTracks);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glitch-hover">
                        The Crow Store
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Découvrez mon univers musical
                    </p>
                </div>
            </section>

            {/* Music Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-center">
                            <span className="text-primary">Écoutez</span> Maintenant
                        </h2>
                        <Button
                            onClick={toggleTracksView}
                            variant="outline"
                            className="gap-2"
                        >
                            <Music className="w-4 h-4" />
                            {showAllTracks ? 'Afficher une piste aléatoire' : 'Voir toutes les pistes'}
                        </Button>
                    </div>
                    
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
                        {!loading && !error && (
                            showAllTracks ? (
                                tracks.map((track, index) => (
                                    <AudioPlayer
                                        key={index}
                                        trackUrl={track.url}
                                        trackName={track.name}
                                        artistName={track.artist}
                                    />
                                ))
                            ) : (
                                randomTrack && (
                                    <AudioPlayer
                                        trackUrl={randomTrack.url}
                                        trackName={randomTrack.name}
                                        artistName={randomTrack.artist}
                                    />
                                )
                            )
                        )}
                    </div>

                    {!loading && tracks.length === 0 && (
                        <div className="text-center text-muted-foreground">
                            Aucune musique disponible
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Index;