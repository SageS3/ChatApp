import './Sidebar.css'
import {signOut, getAuth} from 'firebase/auth'

type SidebarProps = { 
  userData: {[key: string]: any}, 
  setProfile: (profile: boolean) => void
} 

function Sidebar({userData, setProfile}:SidebarProps) { 
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
      <button>Chats</button>
      <button onClick={() => setProfile(true)}>Profile</button>
      <button>Settings</button>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Sidebar 

// If Profile or Settings is selected, 
//the grid will change removing the input portion

// If Chats is selected, the grid will include input