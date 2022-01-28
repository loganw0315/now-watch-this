import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/home/Home';
import Lists from './pages/lists/Lists';
import CreateList from './pages/create-list/CreateList';
import ListMovies from './pages/lists/ListMovies';
import axios from 'axios';



function App() {
  const userId = localStorage.getItem('id')


  const [display, setDisplay] = useState('')
  const [userLists, setUserLists] = useState([])

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
  }, []);
  

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar 
          handleDisplay={handleDisplay}
          handleLogin={handleLogin}
          isLoggedIn={isLoggedIn}
          userLists={userLists}
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
          />
        }/>
        <Route path="/create-list" element={
          <CreateList />
        }/>
        <Route path="/list-movies" element={
          <ListMovies />
        }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
