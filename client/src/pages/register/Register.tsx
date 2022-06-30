import React, { useState, useRef } from 'react'
import './register.scss'

const Register: React.FC = () => {
    const [email,setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const emailRef = useRef <HTMLInputElement>(null)
    const passwordRef = useRef <HTMLInputElement>(null)
    const handleStart = () => {
        if(emailRef.current !== null) {
            setEmail(emailRef.current?.value)
        }
    }
    const handleFinish = () => {
        if(passwordRef.current !== null) {
            setPassword(passwordRef.current.value);
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
                <button className='loginButton'>
                    Sign In
                </button>
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