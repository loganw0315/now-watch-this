import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/home/Home';
import Lists from './pages/lists/Lists';

function App() {
  const [display, setDisplay] = useState('')

  const handleDisplay = (newDisplay) => {
    setDisplay(newDisplay)
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(!isLoggedIn)

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
          handleLogin={handleLogin}/>
          } />
        <Route path="/lists" element={
          <Lists />
        }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
