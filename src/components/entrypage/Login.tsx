import React, {useState} from 'react' 
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';  
import {auth} from '../config/firebase'
const Login: React.FunctionComponent = () => {  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('') 
  const [loginError, setLoginError] = useState<string>('')

  const navigate = useNavigate() 

  const submitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => { 
    if(loginError) setLoginError('')

    event.preventDefault()  
  
    signInWithEmailAndPassword(auth, email, password) 
    .then((userCredential) => {  
      navigate('/dashboard')
      const user = userCredential.user;
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      errorCode === 'auth/wrong-password' && setLoginError('password is incorrect')
      errorCode === 'auth/user-not-found' && setLoginError('User not found') 
    });
  }
  
  return ( 
    <>  
      <form className='entry-page-form' onSubmit={(event) => submitLoginHandler(event)}>  
      {loginError && <p>{loginError}</p> }
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
        <h4>forgot password?</h4>
      </form>
    </>
  )
}

export default Login 

