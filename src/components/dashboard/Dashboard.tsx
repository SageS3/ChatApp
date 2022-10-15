import {useState, useEffect} from 'react'
import Sidebar from '../dashboard/Sidebar' 
import {signOut, updateProfile, updateEmail} from 'firebase/auth'
import {auth} from '../config/firebase'
import {updateDoc, collection, doc } from 'firebase/firestore'
import {db} from '../../components/config/firebase'
import Profile from '../Profile'
import Threads from '../Threads' 
import './Dashboard.css'

const navigateTo = {
  chats: 'chats',
  profile: 'profile'
}

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<string>(navigateTo.chats)
  const [userName, setUserName] = useState<string | null>('')
  const [userEmail, setUserEmail] = useState<any>('')
  const [userPhoto, setUserPhoto] = useState<any>('')
  const [updating, setUpdating] = useState<boolean>(false)

  const user = auth.currentUser
  const userDisplayName = user?.displayName //used for the navbar
  const collectionRef = collection(db, 'users')

  // onComponentDidMount update the user state
  useEffect(() => { 
    if(user){  
      setUserName(user.displayName) 
      setUserEmail(user.email)
      setUserPhoto(user.photoURL)
    } 
  },[user])  

  const updateUsername = async (user:any) => {    
    setUpdating(true)
    //updating Firestore userName...
    const docRef = doc(collectionRef, user.uid) // document id === user.uid
    await updateDoc(docRef, { 
      userName: userName, 
    })
    //updating Firebase auth displayName...
    await updateProfile(user, {displayName: userName})
    .then(() => { 
      console.log('updated username')
    })
    setUpdating(false)
  }  

  const updateUserEmail = async (user:any) => {  
    setUpdating(true) 
    await updateEmail(user, userEmail)
    .then(() => {
      console.log('email updated')
    })
    .catch((error) => {
      console.log(error)
    });
    setUpdating(false) 
  }
  
  const updateUserProfile = (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault()  
    if(user){  
      user.displayName !== userName && updateUsername(user)
      user.email !== userEmail && updateUserEmail(user)
    }
  } 

  const handleLogOut = async () => { 
    await signOut(auth) 
    .then(() => { 
      console.log('user is signed out')
    }) 
    .catch(error => {  
      console.log(error)
    })
  }   

  return (
    <div className='user-dashboard'>   
      <nav> 
        <p>{userDisplayName}</p>
        <button onClick={() => setDashboard(navigateTo.chats)}>Chats</button>
        <button onClick={() => setDashboard(navigateTo.profile)}>Profile</button>
        <button>Settings</button>
        <button className='logout-nav-button' 
        onClick={handleLogOut}>Logout</button> 
      </nav>
      <Sidebar  
        setDashboard={setDashboard} 
        userPhoto={userPhoto}
      ></Sidebar> 
      <main>  
        {dashboard === 'profile' && 
        <Profile 
          userName={userName} 
          userEmail={userEmail}
          setUserName={setUserName}
          updateUser={updateUserProfile}
          setUserEmail={setUserEmail}
          isUpdating={updating}
          userPhoto={userPhoto}
          setUserPhoto={setUserPhoto}
        />}
        {dashboard === 'chats' && <Threads/>}
      </main>
    </div>
  )
}

export default Dashboard