import React, {useState, useRef} from 'react' 
import { EmailAuthProvider,reauthenticateWithCredential, updateProfile} from 'firebase/auth'
import { auth, storage } from '../components/config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import './Profile.css'

type ProfileProps = { 
  userName: any, 
  userEmail: string,
  setUserEmail: (a: string | null) => void,
  setUserName: (a: string | null) => void, 
  updateUser: (e: React.FormEvent<HTMLFormElement>) => void,
  isUpdating: boolean, 
  userPhoto: string,
  setUserPhoto: (a: any) => void
}

const Profile = (props:ProfileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [authorizing, setAuthorizing] = useState(false)
  const [reauthEmail, setReauthEmail] = useState('')
  const [reauthPassword, setReauthPassword] = useState('') 
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  const { userName, userEmail, isUpdating, setUserName, 
    setUserEmail, updateUser, userPhoto, setUserPhoto
    } = props   
 
  const user = auth.currentUser 
  // const photoURL = user?.photoURL
  
  const credentials = EmailAuthProvider.credential(reauthEmail, reauthPassword)

  const reauthUser = async () => {  
    if(user){ 
      await reauthenticateWithCredential(user, credentials )
      .then(() => {
        console.log('user reauthenticated')
      }).catch((error) => {
        console.log(error)
      });
    }
  } 

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
    // const fileName = e.target.files[0].name 
    // const dotIndex = fileName.indexOf('.')
    // const fileExtension = fileName.slice(dotIndex, fileName.length - 1)
    if(e.target.files[0] && user){ 
      const fileRef = ref(storage,`userPhotoStorage/${user?.uid}.png`)
      await uploadBytes(fileRef, e.target.files[0]) // updating photo url in firebase storage
      const downloadedPhoto = await getDownloadURL(fileRef)
      setUserPhoto(downloadedPhoto)
      await updateProfile(user, {photoURL: userPhoto }) // updating user photoURL in firebase Auth
    } else {
      // set profile picture to last picture. useRef? 
      // or set profile picture to default user picture
    }
    setUploadingPhoto(false)
  }

  if(authorizing){
    return( 
      <div className='auth-modal-container'> 
        <form className='auth-modal'>  
          <h3>Enter Credentials</h3>
          <input 
          type='email' 
          placeholder='Email'
          value={reauthEmail} 
          onChange={(e) => setReauthEmail(e.target.value)}
          />
          <input 
          type='password' 
          placeholder='Password'
          value={reauthPassword} 
          onChange={(e) => setReauthPassword(e.target.value)}
          /> 
          <button 
            type='submit' 
            onClick={() => reauthUser()} 
            >Confirm</button>
          <button 
            type='button' 
            onClick={() => setAuthorizing(false)}>Cancel</button> 
        </form>
      </div>
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
        <button>Change Password</button>
        <button>Delete Account</button>
      </div>
      { 
        isUpdating ? <button type='submit' disabled={isUpdating}>Loading...</button> : 
        <button type='submit' >Save</button>
      }
    </form>
  )
} 

export default Profile 

