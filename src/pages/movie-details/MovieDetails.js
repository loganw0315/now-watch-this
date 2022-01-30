import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function MovieDetails() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const movieId = queryParams.get('q')

    const [movieDetails, setMovieDetails] = useState()

    useEffect(() => {
        axios.get(`/movie/${movieId}`)
            .then((res) => {
                setMovieDetails(res.data)
                console.log(movieDetails);
            }
            )
    }, []);
    

    return (
        <div className="movie-details-page">
            <div className="movie-details-container">
                <h1>{movieDetails}</h1>
            </div>
        </div>
    )
}
