import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './App.css';
require('dotenv').config()


function App() {
  const [films, setFilms] = useState([])
  const [search, setSearch] = useState('')
  const [cache, setCache] = useState('')
  
  const api = { 
    KEY: process.env.REACT_APP_API_KEY,
    DEFAULT_SEARCH: process.env.REACT_APP_DEFAULT_SEARCH,
    index(){
      this.searchBy(this.DEFAULT_SEARCH)
    },
    searchBy(find){
      fetch(`https://omdbapi.com/?s=${find}&apikey=${this.KEY}`)
      .then(res => res.json())
      .then(result =>{ setFilms(result.Search)})
    }
  }
  
  useEffect(() => {
    api.index()
  }, [])

  function searchInput(e){
    if(e.key === 'Enter' && search === ''){
      api.index()
    }
else
    if(e.key === 'Enter'){
      api.searchBy(search)
      setCache(search)
      setSearch('')
    }
  }

  return (
    <>
      <main className="app">
        <div className="search-box">
          {cache?<h1>{cache}</h1>:''}
          <input
            type="text"
            placeholder='Buscar por Filme ou Série...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={searchInput}
          />
        </div>
        <div className="container">
          {films?
            films.map(item =>
                  <div key={item.imdbID} className="cards">
                    <Link to={`/search/${item.imdbID}`}><img src={item.Poster} alt="Capa"/></Link>
                    <div className="box-description">
                      <h3 className="title">{item.Title}</h3>
                      <p className="range">{item.Year}</p>
                    </div>
                  </div>
            )
            :
            <p className='error'>Nada para mostrar...</p>
          }
        </div>
      </main>
    </>
  );
}

export default App;
