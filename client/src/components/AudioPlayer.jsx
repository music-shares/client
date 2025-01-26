/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Tag } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AudioPlayer = ({ trackUrl, trackName, artistName, tags = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);


  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-0">
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Player content */}
      <div className="relative z-10 backdrop-blur-sm bg-card/30 p-4 border border-primary/20">
        <audio
          ref={audioRef}
          src={trackUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-primary">{trackName}</h3>
              <p className="text-sm text-muted-foreground">{artistName}</p>
              {Array.isArray(tags) && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <Tag className="w-4 h-4 text-primary" />
                  {tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="bg-primary/10 text-primary border-primary/20 text-xs"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <div className="w-24">
                <Slider
                  defaultValue={[1]}
                  max={1}
                  step={0.1}
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary">
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button 
              onClick={togglePlay}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-primary text-primary hover:text-primary-foreground hover:bg-primary"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>

            <Button variant="ghost" size="icon" className="text-primary">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
              defaultValue={[0]}
              max={duration}
              step={1}
              value={[currentTime]}
              onValueChange={handleSeek}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
