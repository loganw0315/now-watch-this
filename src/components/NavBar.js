import { Link } from 'react-router-dom'
import './NavBar.css'
import Searchbar from './Searchbar'

const logo = require('../assets/nwt-logo.png')

export default function NavBar({handleDisplay, isLoggedIn, userLists, updateUserLists, logout}) {
      
    return (
        <div className='navbar'>
            {isLoggedIn  ? 
                <>
                    <Searchbar 
                    userLists={userLists}
                    updateUserLists={updateUserLists}
                    />
                    <img className='logo' src={logo} alt="logo" />
                    <nav>
                        <Link className='nav-link' to="/lists">My Lists</Link>
                        <Link className='nav-link' to="/create-list">+ Create List</Link>
                        <Link className='nav-link' to="/" onClick={logout}>Logout</Link>
                        
                    </nav>
                </>
                :
                <div className="login-btns">
                    <button className='btn btn-secondary' onClick={()=>handleDisplay('login')}>Login</button>
                    <button className='btn btn-secondary' onClick={()=>handleDisplay('signup')}>Signup</button>
                </div>
            }
        </div>
    )
}
