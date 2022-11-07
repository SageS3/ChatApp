import {deleteUser } from "firebase/auth";
import {auth} from '../config/firebase'

type DeleteAccountFormProps = { 
  setIsDeletingAccount: (a:boolean) => void, 
  setAuthorizing: (a:boolean) => void
}
const DeleteAccountForm = ({setIsDeletingAccount, setAuthorizing}:DeleteAccountFormProps) => { 
  const user = auth.currentUser

  const handleDeleteAccount = async (event:any) => {  
    event.preventDefault()
    if(user) { 
      await deleteUser(user) 
      .then(() => { 
        console.log('User Account Successfully Deleted')
      }) 
      .catch((error) => { 
        error.message.includes('requires-recent-login') && setAuthorizing(true)
      })
    }
  }  

  return ( 
    <div className="delete-account-form-container"> 
      <form onSubmit={(event) => handleDeleteAccount(event)}>  
        <p>Are you sure you want to do this?</p>
        <button type="submit">Delete Account</button> 
        <button type='button' onClick={() => setIsDeletingAccount(false)}>cancel</button>
      </form>
    </div> 
  )
}

export default DeleteAccountForm