import {useState} from 'react'
import Register from './Register'
import Login from './Login' 
import './EntryPage.css'   
import {animated, useSpring} from '@react-spring/web'

type EntryPageProps = { 
  setIsLoggedIn: (a:boolean) => void, 
  setUserData: (a:Object) => void, 
  isLoggedIn: boolean,
}

function EntryPage({setIsLoggedIn, setUserData, isLoggedIn}:EntryPageProps) {  
  const [form, setForm] = useState<string>('register')   

  const slider = useSpring({  
    config:{ duration: 300},
    right: form === 'login' ? '0px' : '100px',
    borderRadius: form === 'login' ? '0 12px 12px 0' : '12px 0 0 12px'
  })

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
        <animated.span style={slider} className='slider'></animated.span>
        <button type='button' onClick={registerHandler}>Sign Up</button> 
        <button type='button' onClick={loginHandler}>Sign In</button>
      </div> 
      {form === 'register' && <Register setForm={setForm}/>}
      {form === 'login' && <Login 
      setIsLoggedIn={setIsLoggedIn} 
      setUserData={setUserData} 
      isLoggedIn={isLoggedIn}
      />}
    </>
  )
}

export default EntryPage