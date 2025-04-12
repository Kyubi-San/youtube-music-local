import { useEffect, useState } from 'react'

function Player({ audioRef, currentSongId, showPreview, setShowPreview, isPlaying, setIsPlaying }) {

    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
    
        return () => {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
    })

    useEffect(() => {
        if (currentSongId !== null) {
            setIsPlaying(true)
        }
    }, [currentSongId])

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
    const [volume, setVolume] = useState()

    const handleVolumeBar = (newVolume) => {
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
        }
    }

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
            <div>
                <img src="" alt=""/>
                <div>
                    <b>Nombre de la cancion</b>
                    <p>Nombre del artista</p>
                </div>
            </div>
            <div className="player__info">
                <div className="player__controls">
                    <i className="fa-solid fa-backward-step"></i>
                    {isPlaying ? <i className="fa-solid fa-pause" onClick={handlePlay}></i> : <i className="fa-solid fa-play" onClick={handlePlay}></i>}
                    <i className="fa-solid fa-step-forward"></i>
                </div>
                <div className="player__progress">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        value={currentTime}
                        max={audioRef.current?.duration || 0}
                        onChange={handleTimeBar}
                    />
                    <span>{duration ? formatTime(duration) : '0:00'}</span>
                </div>
            </div>
            <div className="player__controls">
                <input type="range" value={volume} min='0' max='1' step='0.1' onChange={(e) => handleVolumeBar(e.target.value)}/>
                <i className="fa-solid fa-volume-high" onClick={handleMuteButton}></i>
                <i className="fa-solid fa-random"></i>
                <i className="fa-solid fa-chevron-up" onClick={() => {setShowPreview(!showPreview)}}></i>
            </div>
        </footer>
    )
}

export default Player;