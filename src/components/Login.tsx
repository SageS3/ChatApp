import {useState} from 'react'
function Login() { 
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  return (
    <> 
      <form>  
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
          autoFocus
          required
          type='password' 
          name='password'
          placeholder='Password' 
          value={password}  
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
    </>
  )
}

export default Login