import axios from 'axios'
import { useEffect, useState } from 'react'
import './Searchbar.css'

export default function Searchbar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(searchTerm);
        setIsLoading(true)
        axios.post('http://localhost:4000/search', {
            searchTerm: `${searchTerm}`
        })
        .then((res) => {
            setIsLoading(false)
            setSearchResults(res.data)
            console.log(res.data);
        })
    }

    const addHandler = (e) => {
        const mediaIndex = e.target.id
        const media = searchResults[mediaIndex]
        axios.post('http://localhost:4000/lists', {
            
        })
    }
    
    const clearInput = () => {
        setSearchTerm('')
    }


    useEffect(() => {
         if(searchTerm === ""){
                setSearchResults([])
            }
    }, [searchTerm])
    
  return (
    <div className='searchbar-container'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search:</label>
            <input 
            className='searchbar-input'
            type="text" 
            id='search'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            required
            />
            <button type="button" onClick={() => clearInput()}>X</button>
        </form>
        {(searchResults.length > 0 || isLoading === true) && 
            <div className="search-results-display">
                {searchResults.length > 0 && searchResults.map((result, index) => (
                    <div className="search-result-card" key={index}>
                        <img src={result.image} alt="" />
                        <p className='result-title'>{result.title}</p>
                        <p className='result-description'>{result.description}</p>
                        <button onClick={addHandler} id={index}>+ Add to List</button>
                        <button>View Details</button>
                    </div>
                ))}
                {isLoading === true && <p>Loading...</p>}
            </div>
        }
    </div>
  )
}
