import React, { useState, useRef } from 'react';
import './styles/app.scss';

import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';

import data from './data';
import Nav from './components/Nav';

function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animatioPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animatioPercentage = Math.round(
      (roundedCurrent * 100) / roundedDuration
    );
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animatioPercentage,
    });
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song isPlaying={isPlaying} currentSong={currentSong} />
      <Player
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongs={setSongs}
        setSongInfo={setSongInfo}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        timeUpdateHandler={timeUpdateHandler}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
