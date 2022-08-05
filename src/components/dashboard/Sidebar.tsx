import './Sidebar.css'
import {signOut, getAuth} from 'firebase/auth'

type SidebarProps = {
  setDashboard: (profile: string) => void
} 

function Sidebar({setDashboard}:SidebarProps) { 
  const auth = getAuth()
  const handleLogOut = () => {  
    signOut(auth) 
    .then(() => { 
      console.log('user is signed out')
    }) 
    .catch(error => {  
      console.log(error)
    })
  }     

  const userName = auth.currentUser?.displayName
  
  return (
    <div className='sidebar-wrapper'> 
      <div className='image-container'></div> 
      <p>{userName}</p>
      <button onClick={() => setDashboard('chats')}>Chats</button>
      <button onClick={() => setDashboard('profile')}>Profile</button>
      <button>Settings</button>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Sidebar 