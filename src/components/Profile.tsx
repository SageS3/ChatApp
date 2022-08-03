import React, {useState} from 'react' 
import './Profile.css'
import {getAuth, updateProfile, onAuthStateChanged} from 'firebase/auth'

const Profile: React.FunctionComponent = () => {  
  const [userName, setUserName] = useState<string>('')
  
  
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
        console.log(error)
      })
    }
  }
 
  return (
    <form onSubmit={(e) => updateUserProfile(e)} className='profile-wrapper' >
      <div className='profile-photo'/> 
      <div className='displayname-container'>
        <h3>Display name</h3>  
        <input 
          type='text' 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}
        ></input> 
        <button type='submit'>Save</button>
      </div>
    </form>
  )
} 

export default Profile
