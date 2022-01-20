import './NavBar.css'
import { useLocation } from 'react-router';

export default function NavBar({handleDisplay}) {
    const location = useLocation()

    return (
        <div className='navbar'>
            <nav>
                {location.pathname === '/' && 
                    <div className="login-btns">
                        <button className='btn btn-secondary' onClick={()=>handleDisplay('login')}>Login</button>
                        <button className='btn btn-secondary' onClick={()=>handleDisplay('signup')}>Signup</button>
                    </div>
                }
            </nav>
        </div>
    )
}
