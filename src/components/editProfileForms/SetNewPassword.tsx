import React, {useEffect} from 'react'

const SetNewPassword = () => { 

  useEffect(() => { 
    console.log('set new password form')
  },[])
  return (
    <div> 
      <h3>Set Password</h3>
      <input type="text" placeholder="New password"/>
      <input type="text" placeholder="Confirm password"/>
    </div>
  )
}

export default SetNewPassword