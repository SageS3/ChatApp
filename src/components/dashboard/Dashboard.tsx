import {useState, useEffect} from 'react'
import Sidebar from '../dashboard/Sidebar'
import {signOut, getAuth, updateProfile} from 'firebase/auth'
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
  // const [password, setPassword] = useState('')

  const auth = getAuth()
  const user = auth.currentUser  
  
  // onComponentDidMount update the user state
  useEffect(() => { 
    if(user){  
      setUserName(user.displayName) 
      setUserEmail(user.email) 
    } 
  },[])  

  const updateUserProfile = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault() 
    const auth = getAuth()  
    const user = auth.currentUser
    // if user is signed in continue to update...
    if(user){  
      setUpdating(true)
      await updateProfile(user, {displayName: userName})
      .then(() => { 
        setUserName(user.displayName)
      }) 
      .catch((error) => { 
        console.error(error)
      })
    } 
    setUpdating(false)
  }

  const handleLogOut = () => { 
    signOut(auth) 
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