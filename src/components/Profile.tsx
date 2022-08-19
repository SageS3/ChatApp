import React, {useEffect} from 'react' 
import './Profile.css'

type ProfileProps = { 
  userName: any, 
  userEmail: string,
  setUserEmail: (a: string | null) => void,
  setUserName: (a: string | null) => void, 
  updateUser: (e: React.FormEvent<HTMLFormElement>) => void,  
  isUpdating: boolean, 
}

const Profile = (props:ProfileProps) => {  

  const { userName, userEmail, isUpdating, 
        setUserName, setUserEmail, updateUser
        } = props 

  return (
    <form onSubmit={(e) => updateUser(e)} className='profile-wrapper' >
      <div className='profile-info-container'>
        <h3>Username</h3>  
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
          value={userEmail}
         
          onChange={(e) => setUserEmail(e.target.value)}
        ></input> 
      </div>
      { 
        isUpdating ? <p>loading...</p> : <button type='submit'>Save</button>
      }
    </form>
  )
} 

export default Profile 

