import React, { useState } from 'react'
import {auth} from './config/firebase' 
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import './Register.css'

export default function Register() {  
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('')
  const [registerError, setRegisterError] = useState<string>(''); 
  const [confirm, setConfirm] = useState<string>('');  
  const navigate = useNavigate()

  const submitSignUpHandler = (event: React.FormEvent<HTMLFormElement>) => {
    
    if(registerError !== '') setRegisterError('') 
    if(password !== confirm) setRegisterError('Password does not match')
    event.preventDefault()  

    createUserWithEmailAndPassword(auth, email, password) 
    .then((userCredential) => { 
      navigate('/login')
      const user = userCredential.user 
      console.log(user)
    }) 
    .catch((error) =>{  
      const errorMessage = error.message  
      console.log(errorMessage)
      if (errorMessage.includes('auth/weak-password')){ 
        setRegisterError('Enter stronger password') 
      }  
      
      if(errorMessage.includes('auth/email-already-in-use')){ 
        setRegisterError('Email already in use')
      } 

      if(errorMessage.includes('auth/invalid-email')){ 
        setRegisterError('Invalid email') 
      } 
    }) 
    setEmail('') 
    setPassword('')
    setConfirm('') 
  }   

  return ( 
    <>  
      <form onSubmit={(event) => submitSignUpHandler(event)}> 
      <h1>Sign Up</h1>
        <input
        autoFocus
          required
          type='text' 
          name='email'
          placeholder='Email' 
          value={email} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setEmail(e.target.value)}
        ></input>
        <input
          required
          type='password' 
          name='password'
          placeholder='Password' 
          value={password} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setPassword(e.target.value)}
        ></input>
        <input
          required
          type='password' 
          name='confirm password'
          placeholder='Confirm Password' 
          value={confirm} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setConfirm(e.target.value)}
        ></input>
      <button type='submit'>Submit</button> 
      </form>   
      <p>{registerError}</p>
    </>
  )
}
