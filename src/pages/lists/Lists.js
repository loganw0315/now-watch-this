import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import "./Lists.css"

export default function Lists() {
    let navigate = useNavigate();

    const name = localStorage.getItem('name')
    const userId = localStorage.getItem('id')
    const [userLists, setUserLists] = useState([])

    useEffect(() => {
      axios.get(`http://localhost:4000/lists/${userId}`)
        .then((res) => {
            setUserLists(res.data)
        })
    }, [userId]);

    const viewList = (listId) => {
        navigate(`/list-movies?q=${listId}`)
    }
    

    return (
        <div>
            <div className="lists-container">
            <h1>{name}'s Lists</h1>
            {userLists.map((list) => (
                <div className="list-card" key={list.movie_list_id}>
                    <h2>{list.title}</h2>
                    <p>{list.privacy}</p>
                    <p className="list-card-desc">{list.description}</p>
                    <button onClick={() => viewList(list.movie_list_id)}>View List</button>
                    <button >Delete List</button>
                </div>
            ))}
            </div>
        </div>
    )
}
