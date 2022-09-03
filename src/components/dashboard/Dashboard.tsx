import {useState, useEffect} from 'react'
import Sidebar from '../dashboard/Sidebar'
import {signOut, getAuth, updateProfile, updateEmail} from 'firebase/auth'
import Profile from '../Profile'
import Threads from '../Threads' 
import './Dashboard.css'

//navigate to directories
const navigateTo = {
  chats: 'chats',
  profile: 'profile'
}

function Dashboard() {
  const [dashboard, setDashboard] = useState<string>(navigateTo.chats)
  const [userName, setUserName] = useState<string | null>('')
  const [userEmail, setUserEmail] = useState<any>('')
  const [updating, setUpdating] = useState<boolean>(false)

  const auth = getAuth()
  const user = auth.currentUser   
  const userDisplayName = user?.displayName // used for the navbar
  
  // onComponentDidMount update the user state
  useEffect(() => { 
    if(user){  
      setUserName(user.displayName) 
      setUserEmail(user.email)
    } 
  },[user])   

  const updateUsername = async (user:any) => {    
    setUpdating(true)
    await updateProfile(user, {displayName: userName}) 
    .then(() => { 
      console.log('updated username')
    })
    setUpdating(false)
  }  

  const updateUserEmail = async (user:any) => {  
    setUpdating(true) 
    await updateEmail(user, userEmail).then(() => {
      console.log('email updated')
    }).catch((error) => {
      console.log(error)
    });
    setUpdating(false) 
  }

  const updateUserProfile = (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault()  
    if(user){  
      user?.displayName !== userName && updateUsername(user)
      user.email !== userEmail && updateUserEmail(user)
    }  

    // suspence?
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
        />} 
        {dashboard === 'chats' && <Threads/>}
      </main>  
    </div>
  )
}

export default Dashboard