import { useState } from "react"
import PlaylistItem from "./PlaylistItem"

function Preview({ setShowPreview, showPreview, currentSongId, setCurrentSongId, audioRef, musicList, isPlaying, setIsPlaying}) {

    const cover = musicList[currentSongId-1].cover
    const title = musicList[currentSongId-1].title

    const currentSongGenre = musicList[currentSongId - 1].genre;
    const thisSong = musicList.filter(song => song.id === currentSongId)
    const matchingGenre = musicList.filter(song => song.genre === currentSongGenre && song.id != currentSongId)
    const otherGenre = musicList.filter(song => song.genre !== currentSongGenre)

    const handlePlay = () => {
        if (currentSongId !== null) {
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
        currentSongId && showPreview
         ? 
        <div className='preview__container'>
            <div className="preview__media-container">
                <img src={cover} alt="" className="preview__img" onClick={handlePlay}/>
            </div>
            <div className="preview__playlist">
                <div className="preview__playlist-option">
                    <span>A continuacion</span>
                    <span>Similares</span>
                </div>
                <ul className="preview__playlist-next">
                {
                    [...thisSong, ...matchingGenre, ...otherGenre].map((song) => (
                    <PlaylistItem
                        key={song.id}
                        id={song.id}
                        cover={song.cover}
                        title={song.title}
                        artist={song.artist}
                        audioRef={audioRef}
                        currentSongId={currentSongId}
                        setCurrentSongId={setCurrentSongId}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        setShowPreview={setShowPreview}
                    />
                    ))
                }
                </ul>
            </div>
        </div>
        :
        <div className={`${currentSongId && !showPreview ? 'preview__container--mini' : 'hidden'}`} onClick={handlePlay}>
            <img src={cover} alt="" className="preview__img--mini"/>
        </div>
        }
    </>
    )
}

export default Preview