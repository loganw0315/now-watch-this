import axios from 'axios'
import { useEffect, useState } from 'react'
import './Searchbar.css'

export default function Searchbar({userLists}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showListSelect, setShowListSelect] = useState(false)

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
        console.log(media);
        axios.post('http://localhost:4000/movie', {
            
        })
    }
    
    const clearInput = () => {
        setSearchTerm('')
    }

    const listSelect = (bool) => {
        setShowListSelect(bool)
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
                        <button onClick={() => listSelect(true)} id={index}>+ Add to List</button>
                        <button>View Details</button>
                    </div>
                ))}
                {isLoading === true && <p>Loading...</p>}
            </div>
        }
        {showListSelect === true && 
            <div className='list-select-modal'>
                <div className="list-select-container">
                    <button onClick={() => listSelect(false)}>X</button>
                    {userLists.map((list,index) => (
                        <div className="list-option" key={index}>
                            <h3 className='list-title' onClick={addHandler}>{list.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        }
    </div>
  )
}
