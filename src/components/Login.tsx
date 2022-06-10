import {useState} from 'react'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
function Login() { 
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('') 
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const navigate = useNavigate() 
  const auth = getAuth();

  const submitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => { 
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
      const errorMessage = error.message; 
      console.log(errorCode) 
      console.log(errorMessage)
    });
  }  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid; 
      // console.log(uid) 
    } else {
      // User is signed out
    }
  });
  
  return (
    <> 
      <form onSubmit={(event) => submitLoginHandler(event)}>  
        <h1>Log In</h1>
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
    </>
  )
}

export default Login