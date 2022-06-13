import {useState} from 'react'
import Register from './Register'
import Login from './Login' 
import './EntryPage.css' 

function EntryPage() {  
  const [form, setForm] = useState<string>('register')  
  
  const registerHandler = () => { 
    // toggleButtonAnimation() 
    setForm('register')
  } 

  const loginHandler = () => { 
    // toggleButtonAnimation() 
    setForm('login')
  }

  return (
    <>
      <div className='toggle'>  
        <span className='left'></span>
        <button type='button' onClick={registerHandler}>Sign Up</button> 
        <button type='button' onClick={loginHandler}>Sign In</button>
      </div> 
      {form === 'register' && <Register setForm={setForm}/>}
      {form === 'login' && <Login/>}
    </>
  )
}

export default EntryPage