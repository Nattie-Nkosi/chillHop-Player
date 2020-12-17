import React from 'react';

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  setIsPlaying,
  audioRef,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    const songsList = songs.map((s) => {
      if (s.id === song.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(songsList);
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt='cover'></img>
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
