// Dans un composant TrackList par exemple
import { usePlayer } from '../context/PlayerContext';

export default function TrackList() {
  const { playTrack } = usePlayer();

  const tracks = [
    { id: 1, title: "Titre 1", artist: "Artiste 1" },
    { id: 2, title: "Titre 2", artist: "Artiste 2" },
  ];

  return (
    <div className="space-y-2">
      {tracks.map(track => (
        <div 
          key={track.id}
          onClick={() => playTrack(track)}
          className="track-item"
        >
          <div>
            <h3 className="text-green-500">{track.title}</h3>
            <p className="text-gray-400">{track.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}