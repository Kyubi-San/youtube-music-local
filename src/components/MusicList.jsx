

function MusicList() {
    return (
        <div className='music-list' ref={musicListRef}>
            {
                musicList.map((val) => {
                    return (
                        <MusicCard key={val.id} id={val.id} title={val.title} artist={val.artist} cover={val.cover} href={val.title} setCurrentSongId={setCurrentSongId} currentSongId={currentSongId} audioRef={audioRef} />
                    )
                })
            }
        </div>
    )
}