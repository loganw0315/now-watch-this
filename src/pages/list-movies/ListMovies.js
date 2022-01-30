import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './ListMovies.css'

function ListMovies(userLists) {
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
        console.log(list);
      })
    }, [userLists]);

    
    

  return (
    <div className='list-movies'>
        <h1>{listData.title}</h1>
        {listMovies.length > 0 && listMovies.map((movie)=> (
            <div className="movie-card" key={movie.id}>
                <img className='list-movie-img' src={movie.image_url} alt="movie card" />
                <h3>{movie.title}</h3>
                <button>View Details</button>
            </div>  
        ))}
    </div>
  )

}

export default ListMovies;
