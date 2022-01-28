import { Link } from 'react-router-dom'


import './NavBar.css'
import Searchbar from './Searchbar'

export default function NavBar({handleDisplay, isLoggedIn, userLists}) {
      
    return (
        <div className='navbar'>
            {isLoggedIn  ? 
                <>
                    <Searchbar userLists={userLists}/>
                    <nav>
                        <Link className='nav-link' to="/lists">My Lists</Link>
                        <Link className='nav-link' to="/create-list">+ Create List</Link>
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
