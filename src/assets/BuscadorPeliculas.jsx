import { useState } from "react"

export default function BuscadorPeliculas() {
    const [searchMovie, setSearchMovie] = useState('')
    const [listMovies, setListMovies] = useState('')
    const handleChange = (e) => {
        setSearchMovie(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            const API_KEY = "77461ddf9490df7da2a950a0bbb37cca"
            const response = await fetch(

                `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=${API_KEY}&language=es-AR`
            )
            const result = await response.json()
            console.log(result)
            setListMovies(result)

        } catch (error) {
            console.error(error)
        }
    }



    return (
        <div className="container">
            <h1 className="title">Buscador de Peliculas</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchMovie} onChange={handleChange} className="form-control" placeholder="Buscar una peli" />
                <button type="submit" className="search-button">Buscar</button>
            </form>
            <div className="movie-list">
                {listMovies && listMovies.results.length > 0 && listMovies.results.map((movie) => (
                    <div className="movie-card" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
                        <h3>{movie.original_title}</h3>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}