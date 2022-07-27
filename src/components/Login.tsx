import React, {useState} from 'react' 
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
import { useNavigate } from 'react-router-dom';  

type LoginProps = { 
  setIsLoggedIn: (a:boolean) => void, 
  isLoggedIn: boolean,
}

const Login: React.FunctionComponent<LoginProps> = ({setIsLoggedIn}:LoginProps) => {  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('') 
  const [loginError, setLoginError] = useState<string>('')

  const navigate = useNavigate() 
  const auth = getAuth()

  const submitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => { 
    if(loginError) setLoginError('')

    event.preventDefault()  
  
    signInWithEmailAndPassword(auth, email, password) 
    .then((userCredential) => {  
      setIsLoggedIn(true)
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

