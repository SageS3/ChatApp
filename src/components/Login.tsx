import React, {useState, useEffect} from 'react'
import {auth} from './config/firebase' 
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';  

type LoginProps = { 
  setIsLoggedIn: (a:boolean) => void,
  setUserData: (a:Object) => void,  
  isLoggedIn: boolean,
}

function Login({setIsLoggedIn, setUserData, isLoggedIn}:LoginProps) { 
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('') 
  const [loginError, setLoginError] = useState<string>('')
  // const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate() 

  const submitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault() 
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      const user = userCredential.user; 
      console.log(user)
      navigate('/dashboard')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message; 
      errorCode === 'auth/wrong-password' && setLoginError('password is incorrect')
      errorCode === 'auth/user-not-found' && setLoginError('User not found')
    });
  }    

  useEffect(() => { 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user) 
        setIsLoggedIn(true)
      } else {
        //user is signed out
      } 
    }); 
  }, [])

  return ( 
    <>  
      <form onSubmit={(event) => submitLoginHandler(event)}>  
        <input
          autoFocus
          required
          type='email' 
          name='email'
          placeholder='Email' 
          value={email}  
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          required
          type='password' 
          name='password'
          placeholder='Password' 
          value={password}  
          onChange={(e) => setPassword(e.target.value)}
        ></input> 
        <button type='submit'>Login</button> 
      </form>
      <p>{loginError}</p>
    </>
  )
}

export default Login