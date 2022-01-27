import axios from "axios";
import { useEffect, useState } from "react"
import "./Lists.css"

export default function Lists() {
    const name = localStorage.getItem('name')
    const userId = localStorage.getItem('id')
    const [userLists, setUserLists] = useState([])

    useEffect(() => {
      axios.get(`http://localhost:4000/lists/${userId}`)
        .then((res) => {
            setUserLists(res.data)
        })
    }, [userId]);
    

    return (
        <div>
            <div className="lists-container">
            <h1>{name}'s Lists</h1>
            {userLists.map((list) => (
                <div className="list-card" key={list.movie_list_id}>
                    <h2>{list.title}</h2>
                    <p>{list.privacy}</p>
                    <p className="list-card-desc">{list.description}</p>
                </div>
            ))}
            </div>
        </div>
    )
}
