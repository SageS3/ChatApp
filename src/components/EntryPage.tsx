import {useState} from 'react'
import Register from './Register'
import Login from './Login'

function EntryPage() {  
  const [form, setForm] = useState<string>('register')
  return (
    <div>
      <div className='toggle'> 
        <button type='button' onClick={() => setForm('register')}>Sign Up</button> 
        <button type='button' onClick={() => setForm('login')}>Sign In</button>
      </div> 
      {form === 'register'  && <Register/>}
      {form === 'login' && <Login/>}
    </div>
  )
}

export default EntryPage