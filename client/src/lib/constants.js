export const API_BASE_URL = import.meta.env.DEV 
    ? ''  // Vide car on utilise le proxy Vite
    : 'https://api.okloud-hub.com';
