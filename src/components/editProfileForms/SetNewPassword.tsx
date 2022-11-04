import {useEffect, useState} from 'react'
import { updatePassword} from 'firebase/auth' 
import {auth} from '../config/firebase'
import './SetNewPassword.css'
type SetNewPasswordProps = { 
  setIsSettingPassword: (a:boolean) => void
}
const SetNewPassword = ({setIsSettingPassword}:SetNewPasswordProps) => { 
  const [newPassword, setNewPassword] = useState('') 
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  useEffect(() => { 
    console.log('set new password form')
  },[])  

  const user = auth.currentUser

  const handleFormSubmit = () => { 
    if(confirmNewPassword != newPassword) console.log('password is different')
    if(user) { 
      updatePassword(user, confirmNewPassword) 
      .then(() => { 
        console.log('password updated')
      })
    }
  }
  return (
    <div className='password-modal-container'> 
      <form className='password-modal' onSubmit={() => handleFormSubmit()}> 
        <h3>Set Password</h3>
        <input  
          type="password"  
          placeholder="New password" 
          value={newPassword} 
          onChange={ event => setNewPassword(event.target.value)}
        />
        <input  
          type="password"  
          placeholder="Confirm password"  
          value={confirmNewPassword} 
          onChange={ event => setConfirmNewPassword(event.target.value)}
        />
        <button type='submit'>confirm</button>
        <button type='button' onClick={() => setIsSettingPassword(false)}>cancel</button>
      </form>  
    </div>
  )
}

export default SetNewPassword