import { useEffect, useState } from "react"
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth"
import { user } from "../config/firebase"

import "./SetNewPassword.css"
type SetNewPasswordProps = {
  setIsSettingPassword: (a: boolean) => void
  userEmail: string
  isUpdating: boolean
  setIsUpdating: (a: boolean) => void
}
const SetNewPassword = ({
  setIsSettingPassword,
  userEmail,
  isUpdating,
  setIsUpdating,
}: SetNewPasswordProps) => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [formError, setFormError] = useState<string>("")
  const [currentPassword, setCurrentPassword] = useState("")

  useEffect(() => {
    console.log("set new password form")
  }, [])

  const updateUserPassword = async () => {
    if (user) {
      setIsUpdating(true)
      await updatePassword(user, confirmNewPassword)
        .then(() => {
          console.log("password updated")
          setIsSettingPassword(false)
        })
        .catch((error) => {
          setFormError(error)
        })
      setIsUpdating(false)
    }
  }

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    setFormError("")
    if (currentPassword === "") setFormError("current password missing")
    if (confirmNewPassword !== newPassword)
      setFormError("Passwords not matching")
    if (user) {
      const credentials = EmailAuthProvider.credential(
        userEmail,
        currentPassword
      )
      await reauthenticateWithCredential(user, credentials)
        .then(() => {
          updateUserPassword()
        })
        .catch((error) => {
          setFormError(error)
        })
    }
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
  }

  return (
    <div className="password-modal-container">
      <form className="password-modal" onSubmit={(e) => handleFormSubmit(e)}>
        <h3>Set Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
        />
        {isUpdating ? (
          <button>loading...</button>
        ) : (
          <button type="submit">confirm</button>
        )}

        <button type="button" onClick={() => setIsSettingPassword(false)}>
          cancel
        </button>
        {formError !== "" && <p>{formError}</p>}
      </form>
    </div>
  )
}

export default SetNewPassword
