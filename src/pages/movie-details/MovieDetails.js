import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import './MovieDetails.css'

export default function MovieDetails() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const movieId = queryParams.get('q')

    const [movieDetails, setMovieDetails] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/movie/${movieId}`)
            .then((res) => {
                setMovieDetails(res.data)
            }
            )
    }, []);
    

    return (
        <div className="movie-details-page">
            <div className="movie-details-container">
                <h1>{movieDetails.title}</h1>
                <img src={movieDetails.image} alt="Movie" />
                <p>Year: {movieDetails.year}</p>
                <p>Runtime: {movieDetails.runtimeStr}</p>
                <p>IMDB rating: {movieDetails.imDbRating}</p>
                <p>{movieDetails.plot}</p>
            </div>
        </div>
    )
}
