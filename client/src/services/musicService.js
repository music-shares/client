// src/services/musicService.js
const API_BASE_URL = import.meta.env.DEV 
    ? 'http://localhost:10000'
    : 'https://api.okloud-hub.com';

export const getAvailableFiles = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${API_BASE_URL}/api/musics/files`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch files');
        const data = await response.json();
        return data.files;
    } catch (error) {
        console.error('Error in getAvailableFiles:', error);
        throw error;
    }
};

export const createMusicFromExisting = async (musicData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${API_BASE_URL}/api/musics`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: musicData.title,
                file_name: musicData.fileName,
                tags: musicData.tags,
                from_existing: true,
                artist: musicData.artist
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create music');
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to create music:', error);
        throw error;
    }
};

export const getCatalogedMusic = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${API_BASE_URL}/api/musics`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) throw new Error('Failed to fetch music catalog');
        const data = await response.json();
        
        // Transformation pour votre lecteur personnel
        return {
            files: data.musics.map(music => ({
                id: music.id,
                title: music.title,
                name: music.title,
                fileName: music.audio_file,
                artist: music.user?.username || 'drogothecrow',
                tags: music.tags,
                created: music.created_at,
                updated: music.updated_at,
                userId: music.user_id,
                userName: music.user?.username
            }))
        };
    } catch (error) {
        console.error('Error in getCatalogedMusic:', error);
        return { files: [] };
    }
};
// Service de streaming optimisé
export const getStreamUrl = async (musicId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${API_BASE_URL}/api/musics/${musicId}/stream`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) throw new Error('Failed to get stream URL');

        const data = await response.json();
        return data.stream_url; // S'assure de retourner uniquement l'URL
    } catch (error) {
        console.error(`Failed to get stream URL for music ${musicId}:`, error);
        return null;
    }
};

// Modifiez getMusicList pour utiliser getCatalogedMusic
export const getMusicList = async () => {
    return getCatalogedMusic();  // Maintenant retourne les musiques cataloguées
};

// Service de suppression
export const deleteMusic = async (musicId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${API_BASE_URL}/api/musics/${musicId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete music');
        }

        return true;
    } catch (error) {
        console.error('Error deleting music:', error);
        throw error;
    }
};