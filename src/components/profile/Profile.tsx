import React, { useState, useRef, useEffect } from "react"
import SetNewPassword from "./editProfileForms/SetNewPassword"
import ReauthForm from "./editProfileForms/ReauthForm"
import { FiEdit } from "react-icons/fi"
import { updateProfile } from "firebase/auth"
import { storage, auth } from "../../components/config/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../components/config/firebase"
import "./Profile.css"
import DeleteAccountForm from "./editProfileForms/DeleteAccountForm"

type ProfileProps = {
  setUserEmail: (a: string | null) => void
  setUserName: (a: string | null) => void
  updateUser: (e: React.FormEvent<HTMLFormElement>) => void
  reauthUser: (e: any) => void
  setReauthEmail: (e: any) => void
  setReauthPassword: (e: any) => void
  setUserPhoto: (a: string | null) => void
  setAuthorizing: (a: boolean) => void
  setIsUpdating: (a: boolean) => void
  userName: any
  userEmail: string
  isUpdating: boolean
  userPhoto: string
  authorizing: boolean
  reauthEmail: string
  reauthPassword: string
  reauthError: string
}

const Profile = (props: ProfileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [isSettingPassword, setIsSettingPassword] = useState<boolean>(false)
  const [isDeletingAccout, setIsDeletingAccount] = useState<boolean>(false)
  const user = auth.currentUser
  const {
    userName,
    userEmail,
    isUpdating,
    setUserName,
    setUserEmail,
    updateUser,
    userPhoto,
    setUserPhoto,
    authorizing,
    reauthEmail,
    reauthPassword,
    reauthUser,
    setAuthorizing,
    setReauthEmail,
    setReauthPassword,
    reauthError,
    setIsUpdating,
  } = props

  const isSaveBtnDisabled =
    userName === user?.displayName && userEmail === user?.email

  useEffect(() => {
    return () => {
      if (user) {
        setUserName(user.displayName)
        setUserEmail(user.email)
      }
    }
  }, [])

  const preventEnterKey = (e: any) => {
    e.key === "Enter" && e.preventDefault()
  }

  const setUsernameHandler = (e: any) => {
    setUserName(e.target.value)
    e.preventDefault()
  }

  const handleInputRef = (e: any) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }
  const updatePhotoURLFirestore = async (userId: string, photoURL: string) => {
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef, { photoURL: photoURL }).catch((error) => {
      console.log(error)
    })
  }

  const handlePictureChange = async (e: any) => {
    setUploadingPhoto(true)

    if (e.target.files[0] && user) {
      const fileRef = ref(storage, `userPhotoStorage/${user?.uid}.png`)
      await uploadBytes(fileRef, e.target.files[0]) // updating photo url in firebase storage
      const downloadedPhoto = await getDownloadURL(fileRef)
      setUserPhoto(downloadedPhoto)
      await updateProfile(user, { photoURL: downloadedPhoto }) // updating user photoURL in firebase Auth
      await updatePhotoURLFirestore(user.uid, downloadedPhoto)
    } else {
      console.log("Wrong file type")
    }
    setUploadingPhoto(false)
  }

  if (authorizing) {
    return (
      <ReauthForm
        reauthError={reauthError}
        reauthEmail={reauthEmail}
        reauthPassword={reauthPassword}
        reauthUser={reauthUser}
        setAuthorizing={setAuthorizing}
        setReauthEmail={setReauthEmail}
        setReauthPassword={setReauthPassword}
      />
    )
  }

  if (isSettingPassword) {
    return (
      <SetNewPassword
        setIsSettingPassword={setIsSettingPassword}
        userEmail={userEmail}
        setIsUpdating={setIsUpdating}
        isUpdating={isUpdating}
      />
    )
  }

  if (isDeletingAccout) {
    return (
      <DeleteAccountForm
        setIsDeletingAccount={setIsDeletingAccount}
        setAuthorizing={setAuthorizing}
        setIsUpdating={setIsUpdating}
        isUpdating={isUpdating}
      />
    )
  }

  return (
    <form onSubmit={(e) => updateUser(e)} className="profile--wrapper">
      <div className="edit_image_container">
        <div className="img-container">
          {uploadingPhoto ? (
            <div className="image__loading"></div>
          ) : (
            <img className="profile-picture" src={userPhoto} />
          )}
        </div>
        <button
          className="image__edit--button"
          onClick={(e) => handleInputRef(e)}
        >
          <FiEdit size="1.2em" color={"white"} />
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => handlePictureChange(e)}
        />
      </div>
      <div className="profile-info-container">
        <h3>Username</h3>
        <input
          required
          spellCheck={false}
          onKeyDown={(e) => preventEnterKey(e)}
          type="text"
          value={userName}
          onChange={(e) => setUsernameHandler(e)}
        ></input>
      </div>
      <div className="profile-info-container">
        <h3>Email</h3>
        <input
          required
          spellCheck={false}
          type="email"
          value={userEmail.toLowerCase()}
          onKeyDown={(e) => preventEnterKey(e)}
          onChange={(e) => setUserEmail(e.target.value)}
        ></input>
      </div>
      <div className="sensitive-zone">
        <button type="button" onClick={() => setIsSettingPassword(true)}>
          Change Password
        </button>
        <button type="button" onClick={() => setIsDeletingAccount(true)}>
          Delete Account
        </button>
      </div>
      {isUpdating ? (
        <button type="submit" disabled={isUpdating}>
          Loading...
        </button>
      ) : (
        <button disabled={isSaveBtnDisabled} type="submit">
          Save
        </button>
      )}
    </form>
  )
}

export default Profile
