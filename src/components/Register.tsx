import React, { useState } from 'react'
import {auth} from './config/firebase' 
import { createUserWithEmailAndPassword } from 'firebase/auth' 
import './Register.css'   

type registerProps = { 
  setForm: React.Dispatch<React.SetStateAction<string>>
}

export default function Register(props: registerProps){  
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('')
  const [registerError, setRegisterError] = useState<string>(''); 
  const [confirmPassword, setConfirmPassword] = useState<string>('');  

  const submitSignUpHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()  
    
    if(registerError !== '') setRegisterError('') 
    if(password !== confirmPassword) setRegisterError('Password does not match')
    
    createUserWithEmailAndPassword(auth, email, password) 
    .then((userCredential) => { 
      props.setForm('login')
      const user = userCredential.user  
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
      setConfirmPassword('') 
  }    

  return ( 
    <>    
      <form onSubmit={(event) => submitSignUpHandler(event)}> 
        <input
          autoFocus
          required
          type='email' 
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
          value={confirmPassword} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setConfirmPassword(e.target.value)}
        ></input>
      <button type='submit'>Submit</button> 
      </form>   
      <p>{registerError}</p>
    </>
  )
}
