// src/pages/Home.jsx
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { usePlayer } from '../context/PlayerContext';

export default function Home() {
 const { isDarkMode } = useTheme();
 const { playTrack, currentTrack } = usePlayer();

 const [tracks] = useState([
   { id: 1, title: "Titre 1", artist: "Artiste 1", duration: "3:45" },
   { id: 2, title: "Titre 2", artist: "Artiste 2", duration: "4:20" },
   { id: 3, title: "Titre 3", artist: "Artiste 3", duration: "3:30" }
 ]);

 return (
   <div className={`mx-auto max-w-4xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
     {/* Liste des pistes */}
     <div className="space-y-2">
       {tracks.map((track) => (
         <div
           key={track.id}
           onClick={() => playTrack(track)}
           className={`
             flex justify-between items-center p-4 rounded-lg cursor-pointer
             transition-colors duration-200
             ${isDarkMode ? 
               'hover:bg-gray-900' : 
               'hover:bg-gray-100'
             }
             ${currentTrack?.id === track.id ? 
               'bg-green-500/10 border border-green-500' : 
               ''
             }
           `}
         >
           <div>
             <h3 className="text-green-500 font-medium">{track.title}</h3>
             <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
               {track.artist}
             </p>
           </div>
           <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
             {track.duration}
           </span>
         </div>
       ))}
     </div>

     {/* Message si aucune piste */}
     {tracks.length === 0 && (
       <div className="text-center py-10">
         <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
           Aucune piste disponible
         </p>
       </div>
     )}
   </div>
 );
}