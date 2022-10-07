import React, {useState } from 'react'
import { setDoc,doc} from 'firebase/firestore';
import {db} from '../../components/config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth' 
import { auth, storage } from '../config/firebase'
import {ref, getDownloadURL} from 'firebase/storage'
import './Register.css'  

type registerProps = { 
  setForm: React.Dispatch<React.SetStateAction<string>>
}

export default function Register(props: registerProps){ 
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('')
  const [registerError, setRegisterError] = useState<string>(''); 
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(false)
  console.log('Register Form log')
  // When register form is submitted, updates user.photoURL
  const createDefaultProfilePic = async (user: any, snapShot:string) => { 
    await updateProfile(user, {photoURL: snapShot}) 
    .then(() => { 
      console.log('default picture updated')
    })
  }
  // when user registers, updates user.displayname 
  const createDefaultUsername = async (userName:string, user:any) => {  
    if(user){ 
      await updateProfile(user, {displayName: userName}) 
      .then(() => { 
        console.log('updated username')
      })
    }
  } 

  // creates a default username by slicing user's email
  const sliceEmail = (email:string) => { 
    const atSymbolIndex = email.indexOf('@')
    const defaultUserName = email.slice(0,atSymbolIndex) 
    return defaultUserName
  }
  
  const addUserToFirestore = async (email:string, user:any) => {
    const userId = user?.uid 
    const userPath = `users/${userId}` // using user's unique id as key to user's data
    const docRef = doc(db, userPath)
    const userName = sliceEmail(email)
    const pathName = ref(storage, 'gs://chatapp-a6f5e.appspot.com/defaultImg/user.png')
    const snapShot = await getDownloadURL(pathName)
   
    createDefaultProfilePic(user, snapShot)
    createDefaultUsername(userName, user) 

    await setDoc(docRef, {
      userName: userName, 
      photoURL: snapShot
    })  
    console.log('user added to users collection')
  }

  const submitSignUpHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()  
    if(registerError !== '') setRegisterError('') 
    if(password !== confirmPassword) setRegisterError('Password does not match')
    createUserWithEmailAndPassword(auth, email, password) 
    .then((userCredential) => {
      const currentUser = auth.currentUser
      addUserToFirestore(email, currentUser)
      props.setForm('login')
      const user = userCredential.user
    }) 
    .catch((error) =>{  // error handling 
      const errorMessage = error.message  
      console.log(errorMessage)
      if (errorMessage.includes('auth/weak-password')){ 
        setRegisterError('Enter stronger password') 
      }  
      if(errorMessage.includes('auth/email-already-in-use')){ 
        setRegisterError('Email already in use')
      } 
      if(errorMessage.includes('auth/invalid-email')){ 
        setRegisterError('Invalid email') 
      } 
    }) 
      setEmail('') 
      setPassword('')
      setConfirmPassword('') 
  }    


  return ( 
    <>    
      <form className='entry-page-form' onSubmit={(event) => submitSignUpHandler(event)}> 
        <input
          autoFocus
          required
          type='email' 
          name='email'
          placeholder='Email' 
          value={email} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)}
        ></input>
        <input
          required
          type='password' 
          name='password'
          placeholder='Password' 
          value={password} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setPassword(e.target.value)}
        ></input> 
        <input 
          required
          type='password' 
          name='confirm password'
          placeholder='Confirm Password' 
          value={confirmPassword} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setConfirmPassword(e.target.value)}
        ></input>
      <button type='submit'>Submit</button> 
      </form>   
      <p>{registerError}</p>
    </>
  )
}
