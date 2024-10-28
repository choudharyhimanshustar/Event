import './Intro.css'
import { useNavigate } from 'react-router-dom'
export default function Intro() {
    const navigate=useNavigate();
    return (<div className="Intro">

        <h1>Welcome to the Events App!</h1>
        <img className="gif" src="https://i.pinimg.com/originals/6f/ca/e0/6fcae04651c639d5d3b218f21b467d0b.gif" />
        <h2>This app allows you to create Meetings & Events.
            Start by uploading your first Event!</h2>
        <div className='IntroBtn'>
            <button className="IntroBtnbuttonCSS" onClick={()=>navigate('/login')}><b>Login</b></button>
            <button className="IntroBtnbuttonCSS" onClick={()=>navigate('/signUp')}><b>SignUp</b></button>
        </div>

    </div>)
}