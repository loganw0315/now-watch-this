import axios from "axios";
import { useEffect, useState } from "react"
import "./Lists.css"

export default function Lists() {
    const name = localStorage.getItem('name')
    const userId = localStorage.getItem('id')
    const [userLists, setUserLists] = useState([])

    useEffect(() => {
      axios.post('http://localhost:4000/lists', userId)
        .then((res) => {

        })
    }, []);
    

    return (
        <div>
            <div className="lists-container">
            <h1>{name}'s Lists</h1>
            
            </div>
        </div>
    )
}
