/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { getCatalogedMusic, getStreamUrl } from '../services/musicService';
import { Button } from "@/components/ui/button";
import { Loader2, Music } from "lucide-react";
import AudioPlayer from '../components/AudioPlayer';

const AllTracks = () => {
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const { files } = await getCatalogedMusic();
                if (files && files.length > 0) {
                    setTracks(files);
                    // Ne définit pas currentTrack ici
                }
            } catch (err) {
                setError('Erreur lors du chargement des musiques');
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);

    const handleTrackSelect = async (track) => {
        try {
            // Charge l'URL de streaming seulement quand nécessaire
            const streamUrl = await getStreamUrl(track.id);
            if (streamUrl) {
                setCurrentTrack({
                    ...track,
                    url: streamUrl
                });
            }
        } catch (err) {
            console.error('Erreur lors du chargement du stream:', err);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Chargement des pistes...
        </div>
    );

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Toutes les pistes</h1>

                <div className="grid gap-8">
                    {currentTrack && (
                        <div className="w-full">
                            <AudioPlayer
                                trackUrl={currentTrack.url}
                                trackName={currentTrack.title}
                                artistName={currentTrack.artist}
                                tags={currentTrack.tags}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tracks.map((track) => (
                            <Button
                                key={track.id}
                                variant="outline"
                                className={`w-full justify-start gap-3 ${
                                    currentTrack?.id === track.id ? 'border-primary' : ''
                                }`}
                                onClick={() => handleTrackSelect(track)}
                            >
                                <Music className="w-4 h-4" />
                                <span className="truncate">{track.title}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTracks;