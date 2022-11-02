import React, {useState, useRef, useEffect} from 'react'
import SetNewPassword from './editProfileForms/SetNewPassword'
import ReauthForm from './editProfileForms/ReauthForm' 
import { updateProfile} from 'firebase/auth'
import { auth, storage } from '../components/config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import './Profile.css'

type ProfileProps = { 
  setUserEmail: (a: string | null) => void,
  setUserName: (a: string | null) => void, 
  updateUser: (e: React.FormEvent<HTMLFormElement>) => void,
  reauthUser: (e:any) => void, 
  setReauthEmail: (e:any) => void, 
  setReauthPassword: (e:any) => void, 
  setUserPhoto: (a: string | null) => void, 
  setAuthorizing: (a:boolean) => void,
  userName: any, 
  userEmail: string,
  isUpdating: boolean, 
  userPhoto: string,
  authorizing: boolean, 
  reauthEmail: string, 
  reauthPassword: string, 
  reauthError:string
}  

const Profile = (props:ProfileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [isSettingPassword, setIsSettingPassword] = useState<Boolean>(false)
  const { 
    userName, userEmail, isUpdating, setUserName, 
    setUserEmail, updateUser, userPhoto, setUserPhoto, 
    authorizing, reauthEmail, reauthPassword, reauthUser, 
    setAuthorizing, setReauthEmail, setReauthPassword, reauthError
  } = props  
  
  const user = auth.currentUser 
  
  useEffect(() => { 
    return () => { 
      if(user){  
        setUserName(user.displayName) 
        setUserEmail(user.email)
        setUserPhoto(user.photoURL)
      } 
    }
  },[]) 
 
 

  const preventEnterKey = (e:any) => { 
    e.key === 'Enter' && e.preventDefault()
  } 

  const setUsernameHandler = (e: any) => { // not preventing page reload (not working)
    setUserName(e.target.value)
    e.preventDefault()
  } 

  const handleInputRef = (e:any) => { 
    e.preventDefault() 
    fileInputRef.current?.click() 
  } 

  const handlePictureChange = async (e:any) => { 
    setUploadingPhoto(true) 
 
    if(e.target.files[0] && user){ 
      const fileRef = ref(storage,`userPhotoStorage/${user?.uid}.png`)
      await uploadBytes(fileRef, e.target.files[0]) // updating photo url in firebase storage
      const downloadedPhoto = await getDownloadURL(fileRef)
      setUserPhoto(downloadedPhoto)
      await updateProfile(user, {photoURL: userPhoto }) // updating user photoURL in firebase Auth
    } else {
      // set profile picture to last picture. useRef? 
      // or set profile picture to default user picture
      console.log("Wrong file type")
    }
    setUploadingPhoto(false)
  }

  if(authorizing){
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

  if(isSettingPassword) { 
    return( 
      <SetNewPassword setIsSettingPassword={setIsSettingPassword}/>
    )
  }

  return (
    <form onSubmit={(e) => updateUser(e)} className='profile-wrapper' >
      <div className='edit_image_container'> 
        <div className='img-container'> 
          { 
          uploadingPhoto ? (<div>loading</div>) :
          <img className='profile-picture' src={userPhoto} />
          }
        </div>
          <button onClick={e => handleInputRef(e)}>Edit profile picture</button>
        <input type='file' style={{display:'none'}} ref={fileInputRef} onChange={(e) => handlePictureChange(e)}/>
      </div>
      <div className='profile-info-container'>
        <h3>Username</h3>  
        <input
          required
          spellCheck={false}
          onKeyPress={(e) => preventEnterKey(e)} 
          type='text' 
          value={userName} 
          onChange={(e) => setUsernameHandler(e)}
        ></input> 
      </div> 
      <div className='profile-info-container'>
        <h3>Email</h3>  
        <input 
          required
          spellCheck={false}
          type='email' 
          value={userEmail}
          onKeyPress={(e) => preventEnterKey(e)}
          onChange={(e) => setUserEmail(e.target.value)}
        ></input> 
      </div>  
      <div className='sensitive-zone'>
        <button type='button' onClick={() => setIsSettingPassword(true)}>Change Password</button>
        <button>Delete Account</button>
      </div>
      { 
        isUpdating ? <button type='submit' disabled={isUpdating}>Loading...</button> : 
        <button type='submit'>Save</button>
      }
    </form>
  )
} 

export default Profile 

