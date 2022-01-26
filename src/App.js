import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/home/Home';
import Lists from './pages/lists/Lists';
import CreateList from './pages/create-list/CreateList';



function App() {
  const [display, setDisplay] = useState('')

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
  

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar 
        handleDisplay={handleDisplay}
        isLoggedIn={isLoggedIn}
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
          <Lists />
        }/>
        <Route path="/create-list" element={
          <CreateList />
        }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
