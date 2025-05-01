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
      .then(data => setMusicList(data.sort(() => Math.random() - 0.5)))
  }, [])

  const [playlistIndex, setPlaylistIndex] = useState(0)

  const musicListRef = useRef(null)

  const handleScrollLeft = () => {
    if (musicListRef.current) {
      musicListRef.current.scrollBy({
        top: 0,
        left: -700,
        behavior: "smooth"
      });
    }
  }

  const handleScrollRight = () => {
    if (musicListRef.current) {
      musicListRef.current.scrollBy({
        top: 0,
        left: 700,
        behavior: "smooth"
      });
    }
  }

  const [showPreview, setShowPreview] = useState(false)

  const handleDeployPreview = () => {
      setShowPreview(!showPreview)
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const [musicListFiltered, setMusicListFiltered] = useState([])
  const [currentSong, setCurrentSong] = useState(null)

  const generatePlayList = (thisSong) => {
    const currentSongGenre = thisSong?.genre
    const currentSong = musicList.filter(song => song.id === thisSong.id)
    const matchingGenre = musicList.filter(song => song.genre === currentSongGenre && song.id != thisSong.id)
    const otherGenre = musicList.filter(song => song.genre !== currentSongGenre).slice(0, 10)
    setMusicListFiltered([...currentSong, ...matchingGenre, ...otherGenre])
    setShowPreview(true)
  }
  
  const musicListProps = {
    musicList: musicList,
    musicListFiltered: musicListFiltered,
    setMusicListFiltered: setMusicListFiltered,
    playlistIndex: playlistIndex,
    setPlaylistIndex: setPlaylistIndex,
    showPreview: showPreview, 
    audioRef: audioRef, 
    setShowPreview: setShowPreview, 
    isPlaying: isPlaying,
    setIsPlaying: setIsPlaying,
    currentSong: currentSong,
    setCurrentSong: setCurrentSong,
    generatePlayList: generatePlayList
  }

  const [musicFile, setMusicFile] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [cover, setCover] = useState('')

  const handleSubmitMusic = (e) => {
    e.preventDefault()
    if (musicFile && genre) {
      const formData = new FormData()
      formData.append('musicFile', musicFile)
      formData.append('artist', artist)
      formData.append('genre', genre)
      formData.append('cover', cover)
  
      fetch('http://localhost:3000/uploadMusic', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })
        .then(response => response.json())
        .then(data => console.log(data))
    } else {
      console.log('chamo')
    }
  }

  return (
    <>
      <div className='container'>
        <header className='header'>
          <i className="fa-solid fa-bars"></i>
          <div className='header__search'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" name="" id="" className='header__searchbar' placeholder="Buscar canciones, álbumes, artistas o podcasts"/>
            <form action="" onSubmit={handleSubmitMusic} className='addMusicForm'>
              <input type="file" name="" accept=".mp3" id="" onChange={(e) => {setMusicFile(e.target.files[0])}}/>
              <input type="text" name="artist" id="artist" value={artist} onChange={(e) => {setArtist(e.target.value)}} placeholder='artista'/>
              <input type="text" name="cover" id="cover" value={cover} onChange={(e) => {setCover(e.target.value)}} placeholder='cover'/>
              <select name="" id="" onChange={(e) => {setGenre(e.target.value)}}>
                <option value="" selected disabled>Selecciona un genero</option>
                <option value="Electronic">Electronic</option>
                <option value="J-POP">J-POP</option>
                <option value="Pop">Pop</option>
              </select>
              <button>Enviar</button>
            </form>
          </div>
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
          <ul>
            <li>Nueva playlist</li>
            Streams
          </ul>
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
              musicList.slice(0, 10).map((val) => {
                return (
                  <MusicCard key={val.id} id={val.id} title={val.title} artist={val.artist} cover={val.cover} href={val.title} audioRef={audioRef} setShowPreview={setShowPreview} isPlaying={isPlaying} setIsPlaying={setIsPlaying} generatePlayList={generatePlayList} currentSong={currentSong} setCurrentSong={setCurrentSong} musicList={musicList}/>
                )
              })
              }             
            </div>
          </section>
          <section className='listen-again'>
            <div className='listen-again__description'>
              <div className='listen-again__description-title'>
                <h2>Tus favoritos</h2>
              </div>
              <div className='listen-again__description-buttons'>
                <span onClick={handleDeployPreview}>mas</span>
                <i className="fa-solid fa-chevron-left" onClick={handleScrollLeft}></i>
                <i className="fa-solid fa-chevron-right" onClick={handleScrollRight}></i>
              </div>
            </div>
            <div className='music-list'>
              {
              musicList.slice(10, 20).map((val) => {
                return (
                  <MusicCard key={val.id} id={val.id} title={val.title} artist={val.artist} cover={val.cover} href={val.title} audioRef={audioRef} setShowPreview={setShowPreview} isPlaying={isPlaying} setIsPlaying={setIsPlaying} generatePlayList={generatePlayList} currentSong={currentSong} setCurrentSong={setCurrentSong} musicList={musicList}/>
                )
              })
              }             
            </div>
          </section>
        </main>
        {currentSong && <Preview {...musicListProps}/>}

        {currentSong && <Player {...musicListProps}/>}
      </div>
    </>
  )
}

export default App
