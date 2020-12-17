import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  songs,
  audioRef,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongs,
  setSongInfo,
  timeUpdateHandler,
}) => {
  const activeLibraryandler = (nextPrev) => {
    const songsList = songs.map((s) => {
      if (s.id === nextPrev.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(songsList);
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryandler(songs[(currentIndex + 1) % songs.length]);
    } else {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryandler(songs[songs.length - 1]);
        if (isPlaying) {
          audioRef.current.play();
        }
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animatioPercentage}%)`,
  };

  const dragHandler = (e) => {
    let time = e.target.value;
    audioRef.current.currentTime = time;
    setSongInfo({ ...songInfo, currentTime: time });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className='track'
        >
          <input
            type='range'
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className='animate-track'></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          size='2x'
          onClick={() => skipTrackHandler('skip-back')}
          className='skip-back'
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          size='2x'
          className='play'
          onClick={playSongHandler}
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          size='2x'
          onClick={() => skipTrackHandler('skip-forward')}
          className='skip-forward'
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={() => skipTrackHandler('skip-forward')}
      ></audio>
    </div>
  );
};

export default Player;
