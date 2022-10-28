import {useState} from 'react'
import Register from '../entrypage/Register'
import Login from './Login' 
import './EntryPage.css'   
import {animated, useSpring} from '@react-spring/web'


const EntryPage = () => {  
  const [form, setForm] = useState<string>('register')   
 
  const slider = useSpring({  
    config:{ duration: 200},
    right: form === 'login' ? '0px' : '100px', 
    borderRadius: form === 'login' ? '0 12px 12px 0' : '12px 0 0 12px'
  }) 

  return (
    <>
      <div className='toggle'>  
        <animated.span style={slider} className='slider'></animated.span>
        <button type='button' onClick={() => setForm('register')}>Sign Up</button> 
        <button type='button' onClick={() => setForm('login')}>Sign In</button>
      </div> 
      {form === 'register' && <Register setForm={setForm} />}
      {form === 'login' && <Login/>}
    </>
  )
}

export default EntryPage