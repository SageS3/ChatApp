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

  const { userName, userEmail, isUpdating, setUserName, 
    setUserEmail, updateUser
    } = props  

  const preventEnterKey = (e:any) => { 
    e.key === 'Enter' && e.preventDefault()
  }

  return (
    <form onSubmit={(e) => updateUser(e)} className='profile-wrapper' >
      <div className='profile-info-container'>
        <h3>Username</h3>  
        <input
          required
          spellCheck={false}
          onKeyPress={(e) => preventEnterKey(e)} 
          type='text' 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}
        ></input> 
      </div> 
      <div className='profile-info-container'>
        <h3>Phone Number</h3>  
        <input
          required
          onKeyPress={(e) => preventEnterKey(e)} 
          type='text' 
          value={'(650)-455-0826'} 
          onChange={(e) => setUserName(e.target.value)}
        ></input> 
      </div>
      <p>Requires user credentials to change</p>
      <div className='profile-info-container'>
        <h3>Email</h3>  
        <input 
          required
          spellCheck={false}
          type='email' 
          value={userEmail}
          onKeyPress={(e) => preventEnterKey(e)}
          onChange={(e) => setUserEmail(e.target.value)}
        ></input> 
      </div>  
      <div className='sensitive-zone'> 
        <button>Change Password</button>
        <button>Delete Account</button>
      </div>
      { 
        isUpdating ? <p>loading...</p> : <button type='submit'>Save</button>
      }
    </form>
  )
} 

export default Profile 

