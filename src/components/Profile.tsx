import React, {useState, useEffect} from 'react' 
import './Profile.css'
import {getAuth, updateProfile} from 'firebase/auth'

const Profile: React.FunctionComponent = () => {  
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const updateUserProfile = (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault()  
    const auth = getAuth()  
    const user = auth.currentUser 
    if(user){ 
      updateProfile(user, {displayName: userName})
      .then(() => { 
        console.log('profile updated')
      }) 
      .catch((error) => { 
        console.error(error)
      })
    }
  } 
 
  return (
    <form onSubmit={(e) => updateUserProfile(e)} className='profile-wrapper' >
      <div className='profile-photo'/> 
      <div className='profile-info-container'>
        <h3>Display Name</h3>  
        <input 
          type='text' 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}
        ></input> 
      </div>
      <div className='profile-info-container'>
        <h3>Email</h3>  
        <input 
          type='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        ></input> 
      </div>
      <div className='profile-info-container'>
        <h3>Password</h3>  
        <input 
          type='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        ></input> 
      </div>
      <button type='submit'>Save</button>
    </form>
  )
} 

export default Profile
