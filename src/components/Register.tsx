import React, { useState } from 'react'
import {auth} from './config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {  
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>(''); 
  const [confirm, setConfirm] = useState<string>(''); 


  
  const submitSignUpHandler = (event: React.FormEvent) => {  
    if(error !== '') setError('') 
    if(password !== confirm) setError('Password does not match')

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      const user = userCredential.user  
      console.log(user)
    }) 
    .catch((error) =>{  
      setError(error)
      const errorCode = error.code 
      const errorMessage = error.message 
      console.log(errorCode) 
      console.log(errorMessage)
    })
    event.preventDefault()
  } 
  
  
 
  return ( 
    <> 
      <form onSubmit={(event:React.FormEvent) => submitSignUpHandler(event)}> 
        <input
          required
          type='text' 
          name='email'
          placeholder='Email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          required
          type='text' 
          name='password'
          placeholder='Password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          required
          type='text' 
          name='confirm password'
          placeholder='Confirm Password' 
          value={confirm} 
          onChange={(e) => setConfirm(e.target.value)}
        ></input>
      </form>
    </>
  )
}
