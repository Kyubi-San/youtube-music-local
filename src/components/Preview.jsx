import { useState, useEffect } from "react"
import PlaylistItem from "./PlaylistItem"

function Preview({  musicListFiltered, currentSong, playlistIndex, setPlaylistIndex, setShowPreview, showPreview, audioRef, isPlaying, setIsPlaying, setCurrentSong }) {

    const audio = audioRef.current

    useEffect(() => {
        audio.addEventListener('ended', handleSongEnd)
        return () => {
            audio.removeEventListener("ended", handleSongEnd);
        }
    })

    const handleSongEnd = () => {
        const nextIndex = (playlistIndex + 1) % musicListFiltered.length
        audio.src = `../music/${musicListFiltered[nextIndex].title}.mp3`
        setCurrentSong(musicListFiltered[nextIndex])
        setPlaylistIndex(nextIndex)
        audio.play()
    }
    
    const handlePlay = () => {
        if (currentSong !== null) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
    <>
        {
        currentSong && showPreview
         ? 
        <div className='preview__container'>
            <div className="preview__media-container">
                <img src={currentSong.cover} alt="" className="preview__img" onClick={handlePlay}/>
            </div>
            <div className="preview__playlist">
                <div className="preview__playlist-option">
                    <span className="preview__playlist-options preview__playlist-option--selected">A continuacion</span>
                    <span className="preview__playlist-options">Similares</span>
                </div>
                <ul className="preview__playlist-next">
                {
                    musicListFiltered.map((song, index) => (
                    <PlaylistItem
                        key={song.id}
                        index={index}
                        playlistIndex={playlistIndex}
                        setPlaylistIndex={setPlaylistIndex}
                        id={song.id}
                        cover={song.cover}
                        title={song.title}
                        artist={song.artist}
                        audio={audio}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        setShowPreview={setShowPreview}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        musicListFiltered={musicListFiltered}
                    />
                    ))
                }
                </ul>
            </div>
        </div>
        :
        <div className={`${currentSong.id && !showPreview ? 'preview__container--mini' : 'hidden'}`} onClick={handlePlay}>
            <img src={currentSong.cover} alt="" className="preview__img--mini"/>
        </div>
        }
    </>
    )
}

export default Preview