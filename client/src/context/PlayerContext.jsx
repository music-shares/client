// src/context/PlayerContext.jsx
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [playlist, setPlaylist] = useState([]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const nextTrack = () => {
    // Implémentez la logique pour passer à la piste suivante
  };

  const previousTrack = () => {
    // Implémentez la logique pour passer à la piste précédente
  };

  return (
    <PlayerContext.Provider 
      value={{
        currentTrack,
        isPlaying,
        playlist,
        playTrack,
        pauseTrack,
        nextTrack,
        previousTrack
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePlayer = () => useContext(PlayerContext);