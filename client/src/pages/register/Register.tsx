import React, { useState, useRef } from 'react'
import './register.scss'
import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios';

const Register: React.FC = () => {
    const [email,setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const emailRef = useRef <HTMLInputElement>(null)
    const usernameRef = useRef <HTMLInputElement>(null)
    const passwordRef = useRef <HTMLInputElement>(null)

    const navigate  = useNavigate();
    const handleStart = () => {
        if(emailRef.current !== null) {
            setEmail(emailRef.current?.value)
        }
    }
    const handleFinish = async (e: any) => {
        e.preventDefault()
        if(passwordRef.current && usernameRef.current ) {
            setUsername(usernameRef.current.value);
            setPassword(passwordRef.current.value);
            try{
                await axios.post("http://localhost:8800/api/auth/register", {email,username,password} );
               navigate("/login")
            }catch(err) {}
            
        }   
      };
  return (
    <div className='register'>
        <div className="top">
            <div className="wrapper">
                <img 
                className='logo'
                alt=""
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                />
                <Link to="/login">
                <button className='loginButton' >
                    Sign In
                </button></Link>
            </div>
        </div>
        <div className="container">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
            Ready to watch? Enter your email to create or restart your membership.
            </p>
            {!email ? (
            <div className="input">
                <input type="email" placeholder='Email Address' ref={emailRef} />
                <button className='registerButton' onClick={handleStart}>Get Started</button>
            </div>
            ) : (
            <form className="input">
                <input type="username" placeholder="username" ref={usernameRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="registerButton" onClick={handleFinish}>
                  Start
                </button>
            </form>   
            )}
        </div>
    </div>
  )
}

export default Register