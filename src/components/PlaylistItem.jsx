function PlaylistItem({ audio, musicListFiltered, isPlaying, currentSong, setCurrentSong, setPlaylistIndex, index, setIsPlaying, currentSongId, setCurrentSongId, id, cover, title, artist }) {


    const handlePlay = () => {
        if (currentSongId !== id) {
          audio.id = id
          audio.src = `../music/${title}.mp3`
          audio.play()
          setIsPlaying(true)
          setPlaylistIndex(index)
          setCurrentSong(musicListFiltered.find(song => song.id === id))
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
        <li className={`preview__playlist-item ${currentSong.id === id && 'preview__playlist-item--active'}`}>
            <div onClick={handlePlay}>
                <img src={cover} alt={title} className="preview__playlist-item-cover"/>
                <div className="preview__playlist-item-data">
                    <b>{title}</b>
                    <span className="preview__playlist-item-artist">{artist}</span>
                </div>
            </div>
            <span>
                2:59
            </span>
        </li>
    )
}

export default PlaylistItem