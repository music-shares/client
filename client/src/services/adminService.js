const API_BASE_URL = import.meta.env.DEV 
    ? 'http://localhost:10000'
    : 'https://api.okloud-hub.com';


    export const createMusicFromExisting = async (musicData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
    
            const requestData = {
                title: musicData.title,
                file_name: musicData.fileName,
                tags: musicData.tags,
                from_existing: true,
                artist: musicData.artist
            };
    
            const response = await fetch('https://api.okloud-hub.com/api/musics', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': 'https://music.okloud-hub.com'
                },
                body: JSON.stringify(requestData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create music');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Failed to create music:', error);
            throw error;
        }
    };

// Appliquer les mêmes modifications à getAvailableFiles
export const getAvailableFiles = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/musics/files`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': window.location.origin
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        return data.files;
    } catch (error) {
        console.error('Error in getAvailableFiles:', error);
        throw error;
    }
};