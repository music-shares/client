// src/services/musicService.js
const API_BASE_URL = import.meta.env.DEV 
    ? 'http://localhost:10000'
    : 'https://api.okloud-hub.com';

export const getMusicList = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/musics/files`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch music');
        return await response.json();
    } catch (error) {
        console.error('Error fetching music:', error);
        throw error;
    }
};