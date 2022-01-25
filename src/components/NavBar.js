import './NavBar.css'
import Searchbar from './Searchbar'
// import { useLocation } from 'react-router';

export default function NavBar({handleDisplay, isLoggedIn}) {
    // const location = useLocation()

    return (
        <div className='navbar'>
            <nav>
                {isLoggedIn ? 
                    <Searchbar/>
                    :
                    <div className="login-btns">
                        <button className='btn btn-secondary' onClick={()=>handleDisplay('login')}>Login</button>
                        <button className='btn btn-secondary' onClick={()=>handleDisplay('signup')}>Signup</button>
                    </div>
                }
            </nav>
        </div>
    )
}
