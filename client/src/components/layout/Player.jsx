// src/components/layout/Player.jsx
import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  // eslint-disable-next-line no-unused-vars
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        {/* Contrôles de lecture */}
        <div className="flex items-center gap-4">
          <SkipBack className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full hover:bg-gray-800"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-green-500" />
            ) : (
              <Play className="w-6 h-6 text-green-500" />
            )}
          </button>
          <SkipForward className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
        </div>

        {/* Info piste en cours */}
        <div className="flex-1 text-center">
          {currentTrack ? (
            <div>
              <div className="text-white">{currentTrack.title}</div>
              <div className="text-gray-400 text-sm">{currentTrack.artist}</div>
            </div>
          ) : (
            <div className="text-gray-400">Aucune piste sélectionnée</div>
          )}
        </div>

        {/* Contrôle volume */}
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-24 accent-green-500"
          />
        </div>
      </div>
    </div>
  );
}