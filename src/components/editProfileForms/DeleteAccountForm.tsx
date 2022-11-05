import React from 'react' 
import ReauthForm from './ReauthForm'
import {deleteUser } from "firebase/auth";
import {auth} from '../config/firebase'

const DeleteAccountForm = () => {  
  const user = auth.currentUser
  const handleDeleteAccount = async (event:any) => {  
    event.preventDefault()
    if(user) { 
      await deleteUser(user) 
      .then(() => { 
        console.log('User Account Successfully Deleted')
      }) 
      .catch((error) => { 
        console.log(error)
      })
    }
  }
  return (
    <div className="delete-account-form-container"> 
      <form onSubmit={(event) => handleDeleteAccount(event)}>  
        <p>Are you sure you want to do this?</p>
        <button type="submit">Delete Account</button>
      </form>
    </div>
  )
}

export default DeleteAccountForm