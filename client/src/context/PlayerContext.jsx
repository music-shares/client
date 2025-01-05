// src/context/PlayerContext.jsx
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stopPlay = () => {
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      setIsPlaying, // Ajouté ici
      volume,
      setVolume,
      playTrack,
      togglePlay,
      stopPlay
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};