import React, {useState} from 'react' 
import { EmailAuthProvider,reauthenticateWithCredential, getAuth} from 'firebase/auth'
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
  const [authorizing, setAuthorizing] = useState(false)
  const [reauthEmail, setReauthEmail] = useState('')
  const [reauthPassword, setReauthPassword] = useState('')
  const { userName, userEmail, isUpdating, setUserName, 
    setUserEmail, updateUser
    } = props   

  const auth = getAuth() 
  const user = auth.currentUser  
  
  const credentials = EmailAuthProvider.credential(reauthEmail, reauthPassword)

  const reauthUser = async () => {  
    if(user){ 
      await reauthenticateWithCredential(user, credentials )
      .then(() => {
        console.log('user reauthenticated')
      }).catch((error) => {
        console.log(error)
      });
    }
  } 

  const preventEnterKey = (e:any) => { 
    e.key === 'Enter' && e.preventDefault()
  } 

  const setUsernameHandler = (e: any) => { // not preventing page reload (not working)
    setUserName(e.target.value)
    e.preventDefault()
  }

  if(authorizing){
    return( 
      <div className='auth-modal-container'> 
        <form className='auth-modal'>  
          <h3>Enter Credentials</h3>
          <input 
          type='email' 
          placeholder='Email'
          value={reauthEmail} 
          onChange={(e) => setReauthEmail(e.target.value)}
          />
          <input 
          type='password' 
          placeholder='Password'
          value={reauthPassword} 
          onChange={(e) => setReauthPassword(e.target.value)}
          /> 
          <button 
            type='submit' 
            onClick={() => reauthUser()} 
            >Confirm</button>
          <button 
            type='button' 
            onClick={() => setAuthorizing(false)}>Cancel</button> 
        </form>
      </div>
    )
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
          onChange={(e) => setUsernameHandler(e)}
        ></input> 
      </div> 
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

