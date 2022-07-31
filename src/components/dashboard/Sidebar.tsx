import './Sidebar.css'
import {signOut, getAuth} from 'firebase/auth'

type SidebarProps = { 
  userData: {[key: string]: any}, 
  setDashboard: (profile: string) => void
} 

function Sidebar({userData, setDashboard}:SidebarProps) { 
  const handleLogOut = () => {  
    const auth = getAuth()
    signOut(auth) 
    .then(() => { 
      console.log('user is signed out')
    }) 
    .catch(error => {  
      console.log(error)
    })
  } 
  const userEmail = userData.email
  return (
    <div className='sidebar-wrapper'> 
      <div className='image-container'></div> 
      <p>{userEmail}</p>
      <button onClick={() => setDashboard('chats')}>Chats</button>
      <button onClick={() => setDashboard('profile')}>Profile</button>
      <button>Settings</button>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Sidebar 

// If Profile or Settings is selected, 
//the grid will change removing the input portion

// If Chats is selected, the grid will include input