import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import './Searchbar.css'

export default function Searchbar({userLists, updateUserLists}) {
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showListSelect, setShowListSelect] = useState(false)
    const [searchResultIndex, setSearchResultIndex] = useState()

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
            if(!res.ok) {
                throw new Error(res.statusText)
              }
        })
        .catch((error) => console.log(error))
    }

    const addHandler = (listId) => {
        const media = searchResults[searchResultIndex]
        setShowListSelect(false)
        axios.post('http://localhost:4000/movie', {
            id: media.id,
            title: media.title,
            description: media.description,
            image_url: media.image,
            listId: listId
        })
        .then((res) => {
            updateUserLists(Math.random)
            if(!res.ok) {
            throw new Error(res.statusText)
          }})
        .catch((error) => console.log(error))
        
    }
    
    const clearInput = () => {
        setSearchTerm('')
        setIsLoading(false)
    }

    const listSelect = (e, bool) => {
        if(bool === true){
            setSearchResultIndex(e.target.id)
        }
        setShowListSelect(bool)
    }

    const viewMovieDetails = (movieId) => {
        navigate(`/movie?q=${movieId}`)
    }
    

    useEffect(() => {
         if(searchTerm === ""){
                setSearchResults([])
            }
    }, [searchTerm])
    
  return (
    <div className='searchbar-container'>
        <form onSubmit={handleSubmit}>
            <input 
            className='searchbar-input'
            type="text" 
            id='search'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder='Search'
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
                        <button onClick={(e) => listSelect(e,true)} id={index}>+ Add to List</button>
                        <button onClick={() => viewMovieDetails(result.id)}>View Details</button>
                    </div>
                ))}
                {isLoading === true && <p>Loading...</p>}
            </div>
        }
        {showListSelect === true && 
            <div className='list-select-modal'>
                <div className="list-select-container">
                    <button onClick={() => listSelect(false)}>X</button>
                    {userLists.map((list, index) => (
                        <div className="list-option" onClick={() => addHandler(list.movie_list_id)} key={index}>
                            <h3 className='list-title' >{list.title}</h3>
                            <p>{list.movie_list_id}</p>
                        </div>
                    ))}
                </div>
            </div>
        }
    </div>
  )
}
