import { deleteUser } from "firebase/auth"
import { auth, storage } from "../config/firebase"
import { ref, deleteObject } from "firebase/storage"
// import { doc, deleteDoc } from "firebase/firestore";

import "./DeleteAccountForm.css"

type DeleteAccountFormProps = {
  setIsDeletingAccount: (a: boolean) => void
  setAuthorizing: (a: boolean) => void
  setIsUpdating: (a: boolean) => void
  isUpdating: boolean
}
const DeleteAccountForm = (props: DeleteAccountFormProps) => {
  const { setIsDeletingAccount, setAuthorizing, setIsUpdating, isUpdating } =
    props
  const user = auth.currentUser
  const handleDeleteUserStorage = () => {
    const fileRef = ref(storage, `userPhotoStorage/${user?.uid}.png`)
    deleteObject(fileRef)
      .then(() => console.log("user storage deleted"))
      .catch(() => console.log("user storage deletion unsuccessful"))
  }

  const handleDeleteAccount = async (event: any) => {
    event.preventDefault()
    if (user) {
      setIsUpdating(true)
      await deleteUser(user)
        .then(() => {
          console.log("User Account Successfully Deleted")
          handleDeleteUserStorage()
        })
        .catch((error) => {
          error.message.includes("requires-recent-login") &&
            setAuthorizing(true)
        })
      setIsUpdating(false)
    }
  }

  return (
    <div className="delete-account-container">
      <form
        className="delete-account-modal"
        onSubmit={(event) => handleDeleteAccount(event)}
      >
        <p>Are you sure you want to do this?</p>
        {isUpdating ? (
          <button>loading...</button>
        ) : (
          <button type="submit">delete account</button>
        )}
        <button type="button" onClick={() => setIsDeletingAccount(false)}>
          cancel
        </button>
      </form>
    </div>
  )
}

export default DeleteAccountForm
