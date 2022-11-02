import {useEffect} from 'react'
import './SetNewPassword.css'
type SetNewPasswordProps = { 
  setIsSettingPassword: (a:boolean) => void
}
const SetNewPassword = ({setIsSettingPassword}:SetNewPasswordProps) => { 

  useEffect(() => { 
    console.log('set new password form')
  },[])
  return (
    <div className='password-modal-container'> 
      <form className='password-modal'> 
        <h3>Set Password</h3>
        <input type="text" placeholder="New password"/>
        <input type="text" placeholder="Confirm password"/> 
        <button type='submit'>confirm</button>
        <button type='button' onClick={() => setIsSettingPassword(false)}>cancel</button>
      </form>  
    </div>
  )
}

export default SetNewPassword