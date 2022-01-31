import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/home/Home';
import Lists from './pages/lists/Lists';
import CreateList from './pages/create-list/CreateList';
import ListMovies from './pages/list-movies/ListMovies';
import axios from 'axios';
import MovieDetails from './pages/movie-details/MovieDetails';



function App() {
  const userId = localStorage.getItem('id')


  const [display, setDisplay] = useState('')
  const [userLists, setUserLists] = useState([])
  const [resetLists, setResetLists] = useState(false)


  const handleDisplay = (newDisplay) => {
    setDisplay(newDisplay)
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(!isLoggedIn)
  

  //Checks if id exists in local storage
  useEffect(() => {
    if(localStorage.getItem('id')) {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:4000/lists/${userId}`)
      .then((res) => {
          setUserLists(res.data)
          console.log(`Lists saved: ${res.data[0].title}`);
      })
  }, [resetLists]);
  
  const updateUserLists = (data) => {
    setResetLists(data)
  }

  const logout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    handleDisplay("")
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar 
          handleDisplay={handleDisplay}
          handleLogin={handleLogin}
          isLoggedIn={isLoggedIn}
          userLists={userLists}
          updateUserLists={updateUserLists}
          logout={logout}
          />
        <Routes>
        <Route path="/" element={
          <Home   
          display={display}
          handleDisplay={handleDisplay}
          handleLogin={handleLogin}
          isLoggedIn={isLoggedIn}/>
        } />
        <Route path="/lists" element={
          <Lists 
          isLoggedIn={isLoggedIn}
          userLists={userLists}
          updateUserLists={updateUserLists}
          />
        }/>
        <Route path="/create-list" element={
          <CreateList />
        }/>
        <Route path="/list-movies" element={
          <ListMovies 
          userLists={userLists}
          updateUserLists={updateUserLists}
          />
        }/>
        <Route path="/movie" element={
          <MovieDetails 
          />
        }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
