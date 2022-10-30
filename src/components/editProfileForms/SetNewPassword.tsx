import React, {useEffect} from 'react'

type SetNewPasswordProps = { 
  setIsSettingPassword: (a:boolean) => void
}
const SetNewPassword = ({setIsSettingPassword}:SetNewPasswordProps) => { 

  useEffect(() => { 
    console.log('set new password form')
  },[])
  return (
    <div> 
      <h3>Set Password</h3>
      <input type="text" placeholder="New password"/>
      <input type="text" placeholder="Confirm password"/>
      <button type='button' onClick={() => setIsSettingPassword(false)}>cancel</button>
    </div>
  )
}

export default SetNewPassword