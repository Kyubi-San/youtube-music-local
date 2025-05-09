import { useEffect, useState } from 'react'

function Player({ musicListFiltered, playlistIndex, setPlaylistIndex, setShowPreview, currentSong, setCurrentSong, showPreview, audioRef, musicList, isPlaying, setIsPlaying }) {

    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
    
        return () => {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
    })

    useEffect(() => {
        if (currentSong !== null) {
            setIsPlaying(true)
        }
    }, [currentSong])

    const handlePreviousSongButton = () => {
        const previousIndex = (playlistIndex - 1)
        audioRef.current.src = `../music/${musicListFiltered[previousIndex].title}.mp3`
        setCurrentSong(musicListFiltered[previousIndex])
        setPlaylistIndex(previousIndex)
        audioRef.current.play()
    }

    const handleNextButton = () => {
        const nextIndex = (playlistIndex + 1) % musicListFiltered.length
        audioRef.current.src = `../music/${musicListFiltered[nextIndex].title}.mp3`
        setCurrentSong(musicListFiltered[nextIndex])
        setPlaylistIndex(playlistIndex + 1)
        audioRef.current.play()
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

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }

    const formatTime = time => {
        if (time == null) return `0:00`
    
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)
    
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const duration = audioRef?.current?.duration ?? 0

    const handleTimeBar = (evento) => {
        const nuevaDuracion = evento.target.value;
        setCurrentTime(nuevaDuracion);
        if (audioRef.current) {
          audioRef.current.currentTime = nuevaDuracion;
        }
    }

    const [muteClicked, setMuteClicked] = useState(false)
    const [volume, setVolume] = useState(1)

    const handleVolumeBar = (newVolume) => {
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
        }
    }

    //  Silenciar al hacer click en el boton de volumen

    const handleMuteButton = () => {
        if (!muteClicked) {
            setVolume(0)
            audioRef.current.volume = 0   
        } else {
            setVolume(1)
            audioRef.current.volume = 1
        }
        setMuteClicked(!muteClicked)
    }

    return (
        <footer className='player'>
            <div className="player__progress">
                <input
                    type="range"
                    value={currentTime}
                    max={audioRef.current?.duration || 0}
                    onChange={handleTimeBar}
                />
            </div>
            <div className='player__container'>
                <div className="player__controls">
                    <i className="fa-solid fa-backward-step" onClick={handlePreviousSongButton}></i>
                    {isPlaying ? <i className="fa-solid fa-pause" onClick={handlePlay}></i> : <i className="fa-solid fa-play" onClick={handlePlay}></i>}
                    <i className="fa-solid fa-step-forward" onClick={handleNextButton}></i>
                    <div className='player__controls-duration'>
                        <span>{formatTime(currentTime)}</span> / <span>{duration ? formatTime(duration) : '0:00'}</span>
                    </div>
                </div>
                <div className="player__info">
                    <img src={currentSong.cover} alt="" className='player__info-cover'/>
                    <div className='player__info-title'>
                        <b>{currentSong.title}</b>
                        <span>{currentSong.artist}</span>
                    </div>
                </div>
                <div className="player__controls">
                    <input type="range" value={volume} min='0' max='1' step='0.1' onChange={(e) => handleVolumeBar(e.target.value)}/>
                    <i className="fa-solid fa-volume-high" onClick={handleMuteButton}></i>
                    <i className="fa-solid fa-random"></i>
                    <i className="fa-solid fa-chevron-up" onClick={() => {setShowPreview(!showPreview)}}></i>
                </div>
            </div>
        </footer>
    )
}

export default Player;