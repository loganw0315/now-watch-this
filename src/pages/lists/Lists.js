import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import "./Lists.css"

export default function Lists({isLoggedIn}) {
    let navigate = useNavigate();

    const name = localStorage.getItem('name')
    const userId = localStorage.getItem('id')
    const [userLists, setUserLists] = useState([])
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteListId, setDeleteListId] = useState()
    const [resetLists, setResetLists] = useState(false)

    useEffect(() => {
      axios.get(`http://localhost:4000/lists/${userId}`)
        .then((res) => {
            setUserLists(res.data)
        })
        .catch((error) => console.log(error))
    }, [resetLists]);

    useEffect(() => {
        if(!isLoggedIn){
          navigate('/')
        }
      }, [isLoggedIn]);

    const viewList = (listId) => {
        navigate(`/list-movies?q=${listId}`)
    }

    const deleteHandler = () => {
        setShowDeleteConfirm(false)
        const listId = deleteListId;
        console.log(listId);
        axios.delete(`http://localhost:4000/lists`, {data: {listId: listId}})
        .then((res) => setResetLists(res.data))

    }
    

    return (
        <div>
            <div className="lists-container">
            <h1>{name}'s Lists</h1>
            {userLists.length > 0 && userLists.map((list) => (
                <div className="list-card" key={list.movie_list_id}>
                    <h2>{list.title}</h2>
                    <p>{list.privacy}</p>
                    <p className="list-card-desc">{list.description}</p>
                    <button onClick={() => viewList(list.movie_list_id)}>View List</button>
                    <button onClick={() => {setShowDeleteConfirm(true); setDeleteListId(list.movie_list_id)}}>Delete List</button>
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
