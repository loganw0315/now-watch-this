import './Home.css'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function Home({display, handleDisplay, handleLogin}) {
    
    return (
        <div className="home">
            {display === 'signup' && 
                <SignupForm 
                    handleDisplay={handleDisplay} 
                    handleLogin={handleLogin}
                />
            }
            {display === 'login' && 
                <LoginForm 
                    handleDisplay={handleDisplay} 
                    handleLogin={handleLogin}
                />
            }
        </div>
    )
}
