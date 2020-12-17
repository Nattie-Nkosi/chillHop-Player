import React from 'react';
import LibrarySong from './LibrarySong';

export default function Library({
  songs,
  setSongs,
  libraryStatus,
  setCurrentSong,
  setIsPlaying,
  audioRef,
}) {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            key={song.id}
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}
