import { useEffect, useState } from 'react'

function MusicCard({ id, title, artist, cover, href, audioRef, currentSongId, setCurrentSongId, setShowPreview, isPlaying, setIsPlaying }) {

  const audio = audioRef.current
  
  const handlePlay = () => {
    if (currentSongId !== id) {
      audio.id = id
      audio.src = `../music/${href}.mp3`
      audio.play()
      setCurrentSongId(id)
      setIsPlaying(true)
      setShowPreview(true)
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
      <picture className={`music-card__photo ${currentSongId == id ? 'music-card__photo--playing' : ''}`} onClick={handlePlay}>
        {isPlaying && currentSongId == id ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
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
