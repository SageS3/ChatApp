import React, {useState, useEffect} from 'react'
import {auth} from './config/firebase' 
import {signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';  

type LoginProps = { 
  setIsLoggedIn: (a: boolean) => void,
  setUserData: (a: object) => void,
}

function Login({setIsLoggedIn, setUserData}:LoginProps) { 
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('') 
  const [loginError, setLoginError] = useState<string>('')

  const navigate = useNavigate() 

  const submitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault() 
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      const user = userCredential.user; 
      setIsLoggedIn(true)
      setUserData(user)
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          navigate('/dashboard')
        } else {
          // do something
        }
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message; 
      console.log(errorCode) 
      console.log(errorMessage) 

      errorCode === 'auth/wrong-password' && setLoginError('password is incorrect')
      errorCode === 'auth/user-not-found' && setLoginError('User not found')

    });
  }   

  useEffect(() => { 
    setIsLoggedIn(false)
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
        <p>{loginError}</p>
      </form>
    </>
  )
}

export default Login