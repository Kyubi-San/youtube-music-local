import { useRef, useState, useEffect } from 'react'
import MusicCard from './components/MusicCard'
import Player from './components/Player'
import Preview from './components/Preview'

function App() {
  const [musicList, setMusicList] = useState([])
  const audioRef = useRef(new Audio(null));

  useEffect(() => {
    fetch('music/playlist.json')
      .then(response => response.json())
      .then(data => setMusicList(data))
  }, [])

  const [currentSongId, setCurrentSongId] = useState(null)

  const musicListRef = useRef(null)

  const handleScrollLeft = () => {
    if (musicListRef.current) {
      musicListRef.current.scrollBy({
        top: 0,
        left: -500,
        behavior: "smooth"
      });
    }
  }

  const handleScrollRight = () => {
    if (musicListRef.current) {
      musicListRef.current.scrollBy({
        top: 0,
        left: 500,
        behavior: "smooth"
      });
    }
  }

  const [showPreview, setShowPreview] = useState(false)

  const handleDeployPreview = () => {
      setShowPreview(!showPreview)
  }

  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <>
      <div className='container'>
        <header className='header'>
          <i className="fa-solid fa-bars"></i>
          <input type="text" name="" id="" />
        </header>
        <aside className='sidebar'>
          <nav className='sidebar__nav'>
            <a href="#" className='sidebar__nav-item'>
              <i className="fa-solid fa-house"></i>
              <span>Principal</span>
            </a>
            <a href="#" className='sidebar__nav-item'>
              <i className="fa-solid fa-compass"></i>
              <span>Explorar</span>
            </a>
            <a href="#" className='sidebar__nav-item'>
              <i className="fa-solid fa-music"></i>
              <span>Biblioteca</span>
            </a>
            <a href="#" className='sidebar__nav-item'>
              <i className="fa-brands fa-spotify"></i>
              <span>Actualizar</span>
            </a>
          </nav>
        </aside>
        <main className='main'>
          <section className='categories'>
            <a href="" className="categories__item">Relajacion</a>
            <a href="" className="categories__item">Viaje diario</a>
            <a href="" className="categories__item">Sueño</a>
            <a href="" className="categories__item">Energia</a>
            <a href="" className="categories__item">Triste</a>
            <a href="" className="categories__item">Para sentirte bien</a>
            <a href="" className="categories__item">Romance</a>
            <a href="" className="categories__item">Fiesta</a>
            <a href="" className="categories__item">Entrenamiento</a>
            <a href="" className="categories__item">Concentración</a>
          </section>
          <section className='listen-again'>
            <div className='listen-again__description'>
              <img src="https://yt3.ggpht.com/uo5-N_ghMbDhFljWrYiBrDrlDKMu4B6JnCmjAp_h1kR0FsiPTpEwQW3YYscxwh7axBVKc7qUka4=s88-c-k-c0x00ffffff-no-rj" alt="" className='listen-again__description-photo'/>
              <div className='listen-again__description-title'>
                <h3>Kyubi-San</h3>
                <h2>Volver a escuchar</h2>
              </div>
              <div className='listen-again__description-buttons'>
                <span onClick={handleDeployPreview}>mas</span>
                <i className="fa-solid fa-chevron-left" onClick={handleScrollLeft}></i>
                <i className="fa-solid fa-chevron-right" onClick={handleScrollRight}></i>
              </div>
            </div>
            <div className='music-list' ref={musicListRef}>
              {
              musicList.map((val) => {
                return (
                  <MusicCard key={val.id} id={val.id} title={val.title} artist={val.artist} cover={val.cover} href={val.title} setCurrentSongId={setCurrentSongId} currentSongId={currentSongId} audioRef={audioRef} setShowPreview={setShowPreview} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
                )
              })
              }             
            </div>
          </section>
          <section className='listen-again'>
            <div className='listen-again__description'>
              <img src="https://yt3.ggpht.com/uo5-N_ghMbDhFljWrYiBrDrlDKMu4B6JnCmjAp_h1kR0FsiPTpEwQW3YYscxwh7axBVKc7qUka4=s88-c-k-c0x00ffffff-no-rj" alt="" className='listen-again__description-photo'/>
              <div className='listen-again__description-title'>
                <h3>Kyubi-San</h3>
                <h2>Volver a escuchar</h2>
              </div>
              <div className='listen-again__description-buttons'>
                <span onClick={handleDeployPreview}>mas</span>
                <i className="fa-solid fa-chevron-left" onClick={handleScrollLeft}></i>
                <i className="fa-solid fa-chevron-right" onClick={handleScrollRight}></i>
              </div>
            </div>
            <div className='music-list' ref={musicListRef}>
              {
              musicList.map((val) => {
                return (
                  <MusicCard key={val.id} id={val.id} title={val.title} artist={val.artist} cover={val.cover} href={val.title} setCurrentSongId={setCurrentSongId} currentSongId={currentSongId} audioRef={audioRef} setShowPreview={setShowPreview} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
                )
              })
              }             
            </div>
          </section>      
        </main>
        {currentSongId && <Preview musicList={musicList} showPreview={showPreview} currentSongId={currentSongId} setCurrentSongId={setCurrentSongId} audioRef={audioRef} setShowPreview={setShowPreview} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>}

        {currentSongId && <Player musicList={musicList} currentSongId={currentSongId} setCurrentSongId={setCurrentSongId} audioRef={audioRef} showPreview={showPreview} setShowPreview={setShowPreview} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>}
      </div>
    </>
  )
}

export default App
