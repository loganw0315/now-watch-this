import { Link } from 'react-router-dom'
import './NavBar.css'
import Searchbar from './Searchbar'
// import { useLocation } from 'react-router';

export default function NavBar({handleDisplay, isLoggedIn}) {
    // const location = useLocation()

    return (
        <div className='navbar'>
            {isLoggedIn  ? 
                <>
                    <Searchbar/>
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
