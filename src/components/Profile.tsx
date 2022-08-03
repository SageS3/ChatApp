import React, {useState} from 'react' 
import './Profile.css'
import {getAuth, updateProfile} from 'firebase/auth'

const Profile: React.FunctionComponent = () => {  
  const [userName, setUserName] = useState<string>('userName')
  const auth = getAuth() 
  
  const updateUserProfile = (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault()  
    
    // updateProfile(auth, {
    //   displayName: userName
    // }).then(() => {
    //   console.log('profile updated')
    // }).catch((error) => {
    //   console.log(error)
    // });
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
      </div>
    </form>
  )
} 

export default Profile
