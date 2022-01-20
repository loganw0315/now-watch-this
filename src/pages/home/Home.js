import './Home.css'
import SignupForm from './SignupForm'

export default function Home({display, handleDisplay, handleLogin}) {


    return (
        <div className="home">
            {display === 'signup' && <SignupForm />}
            {/* {display === 'login' && <LoginForm />} */}
        </div>
    )
}
