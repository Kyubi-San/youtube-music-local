import { useState } from "react"

function Preview({ showPreview, currentSongId, audioRef, musicList, isPlaying, setIsPlaying}) {

    const cover = musicList[currentSongId-1].cover
    const title = musicList[currentSongId-1].title

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
                <img src={cover} alt="" className="preview__img" onClick={handlePlay}/>
            <div className="preview__playlist">
                <div className="preview__playlist-option">
                    <span>A continuacion</span>
                    <span>Similares</span>
                </div>
                <ul className="preview__playlist-">
                    <li className="preview__playlist-item">
                        <img src="https://i1.sndcdn.com/artworks-000271732910-66gc2u-t500x500.jpg" alt="" className="preview__playlist-item-cover"/>
                        <div className="preview__playlist-item-data">
                            <b>{title}</b>
                            <span>Artista B</span>
                        </div>
                        <span>
                            2:59
                        </span>
                    </li>
                    <li className="preview__playlist-"></li>
                    <li className="preview__playlist-"></li>
                    <li className="preview__playlist-"></li>
                    <li className="preview__playlist-"></li>
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