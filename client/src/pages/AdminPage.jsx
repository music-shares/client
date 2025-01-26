/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, FolderOpen, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAvailableFiles, createMusicFromExisting } from '@/services/adminService';
import { getCatalogedMusic, deleteMusic } from '@/services/musicService';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        tags: '',
    });
    const [audioFile, setAudioFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [availableFiles, setAvailableFiles] = useState([]);
    const [catalogedMusics, setCatalogedMusics] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const { toast } = useToast();

    const fetchCatalogedMusics = async () => {
        try {
            const response = await getCatalogedMusic();
            setCatalogedMusics(response.files);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de récupérer le catalogue de musiques",
            });
        }
    };

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const files = await getAvailableFiles();
                setAvailableFiles(files);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "Impossible de récupérer la liste des fichiers",
                });
            }
        };
        fetchFiles();
        fetchCatalogedMusics();
    }, [toast]);

    const handleDelete = async (musicId) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette musique ?")) {
            return;
        }

        try {
            await deleteMusic(musicId);
            toast({
                title: "Succès",
                description: "La musique a été supprimée avec succès",
            });
            fetchCatalogedMusics(); // Rafraîchir la liste
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de supprimer la musique",
            });
        }
    };

    const handleSubmitUpload = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const data = new FormData();
        data.append('title', formData.title);
        data.append('artist', formData.artist);
        data.append('tags', formData.tags);
        data.append('audio', audioFile);
        if (coverImage) {
            data.append('cover', coverImage);
        }

        try {
            const response = await fetch('/api/musics', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                toast({
                    title: "Succès",
                    description: "La musique a été uploadée avec succès",
                });
                resetForm();
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "L'upload a échoué. Veuillez réessayer.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitExisting = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const selectedFileData = availableFiles.find(f => f.name === selectedFile);
            if (!selectedFileData) {
                throw new Error('No file selected');
            }
    
            await createMusicFromExisting({
                title: formData.title || selectedFileData.name.replace('.mp3', ''),
                artist: formData.artist,
                tags: formData.tags,
                fileUrl: selectedFileData.url,
                fileName: selectedFileData.name,
                // Ajoutez d'autres métadonnées si nécessaire
                duration: selectedFileData.duration,
                size: selectedFileData.size
            });
    
            toast({
                title: "Succès",
                description: "La musique a été créée avec succès",
            });
            resetForm();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: error.message || "La création a échoué. Veuillez réessayer.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', artist: '', tags: '' });
        setAudioFile(null);
        setCoverImage(null);
        setSelectedFile('');
    };

    return (
        <Card className="w-full max-w-2xl mx-auto bg-card">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    <span className="text-primary">Gestion</span> des Musiques
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="existing" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="manage">Gérer</TabsTrigger>
                        <TabsTrigger value="existing">Fichiers existants</TabsTrigger>
                        <TabsTrigger value="upload">Nouvel upload</TabsTrigger>
                    </TabsList>

                    <TabsContent value="manage">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Musiques cataloguées</h3>
                            {catalogedMusics.length === 0 ? (
                                <p className="text-muted-foreground">Aucune musique cataloguée</p>
                            ) : (
                                <div className="space-y-2">
                                    {catalogedMusics.map((music) => (
                                        <div 
                                            key={music.id} 
                                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                        >
                                            <div>
                                                <h4 className="font-medium">{music.title}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {music.artist} • {music.tags}
                                                </p>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(music.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="existing">
                        <form onSubmit={handleSubmitExisting} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="file">Fichier Audio</Label>
                                <Select
                                    value={selectedFile}
                                    onValueChange={setSelectedFile}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un fichier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableFiles.map((file, index) => (
                                            <SelectItem key={index} value={file.name}>
                                                {file.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Titre</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    required
                                    className="bg-background border-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="artist">Artiste</Label>
                                <Input
                                    id="artist"
                                    type="text"
                                    value={formData.artist}
                                    onChange={e => setFormData({...formData, artist: e.target.value})}
                                    className="bg-background border-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                                <Input
                                    id="tags"
                                    type="text"
                                    value={formData.tags}
                                    onChange={e => setFormData({...formData, tags: e.target.value})}
                                    className="bg-background border-primary/20"
                                />
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={isLoading || !selectedFile}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Création en cours...
                                    </>
                                ) : (
                                    <>
                                        <FolderOpen className="mr-2 h-4 w-4" />
                                        Créer depuis le fichier existant
                                    </>
                                )}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="upload">
                        <form onSubmit={handleSubmitUpload} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Titre</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    required
                                    className="bg-background border-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="artist">Artiste</Label>
                                <Input
                                    id="artist"
                                    type="text"
                                    value={formData.artist}
                                    onChange={e => setFormData({...formData, artist: e.target.value})}
                                    className="bg-background border-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                                <Input
                                    id="tags"
                                    type="text"
                                    value={formData.tags}
                                    onChange={e => setFormData({...formData, tags: e.target.value})}
                                    className="bg-background border-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="audio">Fichier Audio</Label>
                                <Input
                                    id="audio"
                                    type="file"
                                    accept="audio/*"
                                    onChange={e => setAudioFile(e.target.files[0])}
                                    required
                                    className="bg-background border-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cover">Image de couverture</Label>
                                <Input
                                    id="cover"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setCoverImage(e.target.files[0])}
                                    className="bg-background border-primary/20"
                                />
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Upload en cours...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload
                                    </>
                                )}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
