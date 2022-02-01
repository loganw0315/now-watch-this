import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import "./Lists.css"

export default function Lists({isLoggedIn, userLists, updateUserLists}) {
    let navigate = useNavigate();

    const name = localStorage.getItem('name')
    const userId = localStorage.getItem('id')
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteListId, setDeleteListId] = useState(null)
    const [userMovies, setUserMovies] = useState([])
    

    useEffect(() => {
        if(!isLoggedIn){
          navigate('/')
        }
    }, [isLoggedIn]);

    useEffect(() => {
        updateUserLists(Math.random)
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:4000/user-movies/${userId}`)
        .then((res) => {
          console.log(res.data);
          setUserMovies(res.data[0])
        })
    }, [userLists]);
    
    

    const viewList = (listId) => {
        navigate(`/list-movies?q=${listId}`)
    }

    const deleteHandler = () => {
        setShowDeleteConfirm(false)
        const listId = deleteListId;
        console.log(listId);
        axios.delete(`http://localhost:4000/lists`, {data: {listId: listId}})
        .then((res) => {
            updateUserLists(Math.random)
        })
    }
    

    return (
        <div className="list-page">
            <div className="lists-container">
            <h1>{name}'s Lists</h1>
            {userLists.length > 0 && userLists.map((list) => (
                <div className="list-card" key={list.movie_list_id}>
                    <h2>{list.title}</h2>
                    <div className="movie-gallery">
                        {userMovies.filter(movie => movie.movie_list_id === list.movie_list_id).reverse().map((movie, index) => 
                            (movie.movie_list_id === list.movie_list_id && index < 6) && <img  className="movie-gallery-img" src={movie.image_url} alt="movie" />
                        )}
                    </div>
                    <p className="list-card-desc">{list.description}</p>
                    <div className="btn-container">
                        <button onClick={() => {setShowDeleteConfirm(true); setDeleteListId(list.movie_list_id)}}>Delete List</button>
                        <button onClick={() => viewList(list.movie_list_id)}>View List</button>
                    </div>
                </div>
            ))}
            {showDeleteConfirm && 
                <div className="delete-confirm-modal">
                    <div className="delete-confirm-container">
                        <h2>Are you sure?</h2>
                        <button onClick={deleteHandler}>Delete it!</button>
                        <button onClick={() => setShowDeleteConfirm(false)}>Nevermind</button>
                    </div>
                </div> 
            }
            </div>
        </div>
    )
}
