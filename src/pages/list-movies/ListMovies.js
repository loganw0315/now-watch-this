import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router";

import './ListMovies.css'


function ListMovies(userLists, updateUserLists) {
  const navigate = useNavigate()
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const listId = queryParams.get('q')
  const [listMovies, setListMovies] = useState([])
  const [listData, setListData] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/list-movies/${listId}`, )
    .then((res) => {
      const {movies, list} = res.data
      setListMovies(movies)
      setListData(list)
    })
  }, [userLists]);

  const viewMovieDetails =(movieId) =>{
    navigate(`/movie?q=${movieId}`)
  }

  const removeMovie = (movieId) => {
    axios.delete(`http://localhost:4000/movie`,{data: {
      movieId: movieId,
      listId: listData.id
    }})
    .then((res) => {
      updateUserLists(Math.random)
    }
    )
  }

    

  return (
    <div className='list-movies'>
        <h1>{listData.title}</h1>
        {listMovies.length > 0 && listMovies.map((movie)=> (
            <div className="movie-card" key={movie.id}>
                <img className='list-movie-img' src={movie.image_url} alt="movie card" />
                <h3>{movie.title}</h3>
                <div className="btn-container">
                  <button onClick={() => viewMovieDetails(movie.id)}>View Details</button>
                  <button onClick={() => removeMovie(movie.id)}>Remove</button>
                </div>
            </div>  
        ))}
    </div>
  )

}

export default ListMovies;
