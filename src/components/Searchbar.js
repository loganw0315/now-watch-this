import axios from 'axios'
import { useState } from 'react'
import './Searchbar.css'

export default function Searchbar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(searchTerm);
        axios.post('http://localhost:4000/search', {
            searchTerm: `${searchTerm}`
        })
        .then((res) => {
            setSearchResults(res.data)
            console.log(res.data);
        })
    }
    
  return (
    <div className='searchbar-container'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search:</label>
            <input 
            className='searchbar-input'
            type="text" 
            id='search'
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            />
        </form>
        {searchResults.length > 1 && 
            <div className="search-results-display">
                {searchResults.map((result, index) => (
                    <div className="search-result-card" key={index}>
                        <img src={result.image} alt="" />
                        <p>{result.title}</p>
                    </div>
                ))}
            </div>
        }
    </div>
  )
}
