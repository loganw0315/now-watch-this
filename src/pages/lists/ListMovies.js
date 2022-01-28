import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './ListMovies.css'

function ListMovies() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const listId = queryParams.get('q')
    const [listMovies, setListMovies] = useState([])

    useEffect(() => {
      axios.get(`http://localhost:4000/list-movies/${listId}`, )
      .then((res) => {
        setListMovies(res.data)
        console.log(res.data);
        console.log(listMovies);
      })
    }, []);
    

  return (
    <div className='list-movies'>
        {listMovies.length > 0 && listMovies.map((movie)=> (
            <div className="movie-card">
                <img className='list-movie-img' src={movie.image_url} alt="movie card" />
                <h3>{movie.title}</h3>

            </div>  
        ))}
    </div>
  )

}

export default ListMovies;
