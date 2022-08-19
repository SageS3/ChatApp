import './Sidebar.css'
import {signOut, getAuth} from 'firebase/auth'

type SidebarProps = {
  setDashboard: (profile: string) => void,
} 

const Sidebar: React.FC<SidebarProps> = ({setDashboard}:SidebarProps) => { 
  const auth = getAuth()
  let userDisplayName = auth.currentUser?.displayName
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
    <div className='sidebar-wrapper'>
      <div className='image-container'></div>
      {<p>{userDisplayName}</p>}
      <button onClick={() => setDashboard('chats')}>Chats</button>
      <button onClick={() => setDashboard('profile')}>Profile</button>
      <button>Settings</button>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Sidebar  
