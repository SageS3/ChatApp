import {useEffect, useState} from 'react'
import { updatePassword,reauthenticateWithCredential} from 'firebase/auth' 
import {auth} from '../config/firebase' 

import './SetNewPassword.css'
type SetNewPasswordProps = { 
  setIsSettingPassword: (a:boolean) => void
}
const SetNewPassword = ({setIsSettingPassword}:SetNewPasswordProps) => { 
  const [newPassword, setNewPassword] = useState('') 
  const [confirmNewPassword, setConfirmNewPassword] = useState('') 
  const [formError, setFormError] = useState('') 
  const [currentPassword, setCurrentPassword] = useState('')

  useEffect(() => { 
    console.log('set new password form')
  },[])  

  const user = auth.currentUser

  const handleFormSubmit = (e: any) => {  
    e.preventDefault()
    if(confirmNewPassword != newPassword) setFormError('Passwords not matching')
    if(user) {  

      updatePassword(user, confirmNewPassword) 
      .then(() => { 
        console.log('password updated')
      })
    }
  } 

  // const credentials = EmailAuthProvider.credential(reauthEmail, reauthPassword)

  // const reauthUser = async (event:any) => { 
  //   event.preventDefault()
  //   if(user){ 
  //     await reauthenticateWithCredential(user, credentials )
  //     .then(() => {
  //       console.log('user reauthenticated')
  //       setAuthorizing(false)
  //     }).catch((error) => { 
  //       console.log(error.message)
  //       setReauthError('incorrect email or password')
  //     });
  //   } 
  //   setReauthEmail('')
  //   setReauthPassword('')
  // } 

  return (
    <div className='password-modal-container'> 
      <form className='password-modal' onSubmit={(e) => handleFormSubmit(e)}> 
        <h3>Set Password</h3> 
        <input  
          type="password"  
          placeholder="Current Password" 
          value={currentPassword} 
          onChange={ event => setCurrentPassword(event.target.value)}
        />
        <input  
          type="password"  
          placeholder="New Password" 
          value={newPassword} 
          onChange={ event => setNewPassword(event.target.value)}
        />
        <input  
          type="password"  
          placeholder="Confirm New Password"  
          value={confirmNewPassword} 
          onChange={ event => setConfirmNewPassword(event.target.value)}
        />
        <button type='submit'>confirm</button>
        <button type='button' onClick={() => setIsSettingPassword(false)}>cancel</button>
        {formError !== '' && <p>{formError}</p>}
      </form>   
    </div>
  )
}

export default SetNewPassword