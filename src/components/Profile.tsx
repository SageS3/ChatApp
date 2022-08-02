import React from 'react' 
import './Profile.css'

type ProfileProps = { 
  userData:{[key: string]: any},
}

const Profile = ({userData}:ProfileProps) => { 

  const displayName = () => { 
    if(userData.displayName === undefined) return ''
  }
  
  return (
    <div className='profile-wrapper'>
      <div className='profile-photo'/> 
      <div className='displayname-container'>
        <h3>Display name</h3>  
        <input type='text'>{displayName()}</input>
      </div> 
      
    </div>
  )
} 

export default Profile
