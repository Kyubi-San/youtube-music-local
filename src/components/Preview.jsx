import { useState, useEffect } from "react"
import PlaylistItem from "./PlaylistItem"

function Preview({ setShowPreview, showPreview, currentSongId, setCurrentSongId, audioRef, musicList, isPlaying, setIsPlaying}) {

    const currentSong = musicList.find(song => song.id === currentSongId)

    const [playlistIndex, setPlaylistIndex] = useState(0)
    const audio = audioRef.current

    const [musicListFiltered, setMusicListFiltered] = useState([])

    useEffect(() => {
        const currentSongGenre = currentSong?.genre
        const thisSong = musicList.filter(song => song.id === currentSongId)
        const matchingGenre = musicList.filter(song => song.genre === currentSongGenre && song.id != currentSongId)
        const otherGenre = musicList.filter(song => song.genre !== currentSongGenre).slice(0, 10)
        setMusicListFiltered([...thisSong, ...matchingGenre, ...otherGenre])
    }, [])

    useEffect(() => {
        audio.addEventListener('ended', handleSongEnd)
        return () => {
            audio.removeEventListener("ended", handleSongEnd);
        }
    })

    const handleSongEnd = () => {
        const nextIndex = (playlistIndex + 1) % musicListFiltered.length
        audio.src = `../music/${musicListFiltered[nextIndex].title}.mp3`
        setCurrentSongId(musicListFiltered[nextIndex].id)
        setPlaylistIndex(nextIndex)
        audio.play()
    }
    
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
                <img src={currentSong.cover} alt="" className="preview__img" onClick={handlePlay}/>
            </div>
            <div className="preview__playlist">
                <div className="preview__playlist-option">
                    <span>A continuacion</span>
                    <span>Similares</span>
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
            <img src={currentSong.cover} alt="" className="preview__img--mini"/>
        </div>
        }
    </>
    )
}

export default Preview