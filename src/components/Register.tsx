import React, { useState } from 'react'
import {auth} from './config/firebase' 
// import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {  
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>(''); 
  const [confirm, setConfirm] = useState<string>('');  
  // const navigate = useNavigate()

  const submitSignUpHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()  
    if(error !== '') setError('') 
    if(password !== confirm) setError('Password does not match')

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      // navigate('/')
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
  } 
  
  return ( 
    <> 
      <form onSubmit={(event) => submitSignUpHandler(event)}> 
        <input
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
          type='text' 
          name='password'
          placeholder='Password' 
          value={password} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setPassword(e.target.value)}
        ></input>
        <input
          required
          type='text' 
          name='confirm password'
          placeholder='Confirm Password' 
          value={confirm} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setConfirm(e.target.value)}
        ></input>
      </form>
    </>
  )
}
