// src/components/layout/Player.jsx
import { usePlayer } from '../../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    volume,
    setVolume,
    togglePlay,
    setIsPlaying
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <div className="flex items-center gap-4">
          <SkipBack className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
          <button
            onClick={togglePlay}
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

        <div className="flex-1 text-center">
          <div className="text-white">{currentTrack.name}</div>
          <div className="text-gray-400 text-sm">
            {(currentTrack.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>

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

        {currentTrack.url && (
          <audio
            src={currentTrack.url}
            autoPlay={isPlaying}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  );
}