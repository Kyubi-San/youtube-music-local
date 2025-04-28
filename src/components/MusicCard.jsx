import { useEffect, useState } from 'react'

function MusicCard({ id, musicList, title, artist, cover, href, audioRef, currentSong, setCurrentSong, isPlaying, setIsPlaying, generatePlayList }) {

  const audio = audioRef.current
  
  const handlePlay = () => {
    if (currentSong?.id !== id) {
      audio.id = id
      audio.src = `../music/${href}.mp3`
      audio.play()
      setIsPlaying(true)
      const thisSong = musicList.find(song => song.id === id)
      setCurrentSong(thisSong)
      generatePlayList(thisSong)
    } else {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="music-card">
      <picture className={`music-card__photo ${currentSong?.id == id ? 'music-card__photo--playing' : ''}`} onClick={handlePlay}>
        {isPlaying && currentSong?.id == id ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
        <img src={cover} alt="Album cover" />
      </picture> 
      <div className='music-card__description'>
        <b>{title}</b> 
        <span>{artist}</span>
      </div>
    </div>
  )
}

export default MusicCard;
