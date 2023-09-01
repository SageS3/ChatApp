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
  setProfileForm: any
  updateUser: (e: React.FormEvent<HTMLFormElement>) => void
  reauthUser: (e: any) => void
  setReauthEmail: (e: any) => void
  setReauthPassword: (e: any) => void
  setAuthorizing: (a: boolean) => void
  setIsUpdating: (a: boolean) => void
  profileForm: any
  isUpdating: boolean
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
    profileForm,
    setProfileForm,
    updateUser,
    authorizing,
    reauthEmail,
    reauthPassword,
    isUpdating,
    reauthUser,
    setAuthorizing,
    setReauthEmail,
    setReauthPassword,
    reauthError,
    setIsUpdating,
  } = props

  const { userName, userEmail, userPhoto } = profileForm

  const isSaveBtnDisabled =
    userName === user?.displayName && userEmail === user?.email

  useEffect(() => {
    return () => {
      if (user) {
        setProfileForm({
          ...profileForm,
          userName: user.displayName,
          userEmail: user.email,
        })
      }
    }
  }, [])

  const preventEnterKey = (e: any) => {
    e.key === "Enter" && e.preventDefault()
  }

  const inputHandler = (e: any) => {
    const inputName = e.target.name
    setProfileForm({ ...profileForm, [inputName]: e.target.value })
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
      setProfileForm({ ...profileForm, userPhoto: downloadedPhoto })
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
          name="userPhoto"
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => handlePictureChange(e)}
        />
      </div>
      <div className="profile-info-container">
        <h3>Username</h3>
        <input
          name="userName"
          required
          spellCheck={false}
          onKeyDown={(e) => preventEnterKey(e)}
          type="text"
          value={userName}
          onChange={(e) => inputHandler(e)}
        ></input>
      </div>
      <div className="profile-info-container">
        <h3>Email</h3>
        <input
          name="userEmail"
          required
          spellCheck={false}
          type="email"
          value={userEmail.toLowerCase()}
          onKeyDown={(e) => preventEnterKey(e)}
          onChange={(e) => inputHandler(e)}
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
