import React,{useState,useEffect} from 'react';
import './Search.css'
import { Link } from 'react-router-dom';
require('dotenv').config()

const Search = (props) => {
    const [film, setFilm] = useState({})
    const id = props.match.params.id
    
    const api = {
        KEY: process.env.REACT_APP_API_KEY,
        searchBy(find){
          fetch(`https://omdbapi.com/?i=${find}&apikey=${this.KEY}`)
          .then(res => res.json())
          .then(result =>{ setFilm(result)})
        }
      }

    useEffect(() => {
        api.searchBy(id)
    }, [])

    return (
        <>
            {film?
                <div className="root">
                <div className="groupContainer">
                    <div className="img-container">
                        <img src={film.Poster} alt="Capa"/>
                    </div>
                    <div className="description-container">
                        <div className="inline_itens text_header">
                            <div>
                                <h3 className="title">{film.Title}</h3>
                                <p className="type">{film.Type+': '+film.Year}</p>
                            </div>
                            <Link to='/'><span className="material-icons">close</span></Link>
                        </div>
                        <p className="category">{film.Genre}</p>
                        <p className="description">{film.Plot}</p>
                        <div className="inline_itens bottom">
                            <p className="duration"><b>Duração:</b> {film.Runtime}</p>
                            <p className="idiom"><b>Idioma:</b> {film.Language}</p>
                        </div>
                        <p className="classification">Classificação: {film.imdbRating}</p>
                    </div>
                </div>
            </div>
            :
                'Filme não encontrado!'
            }
            
        </>
    );
}

export default Search;
