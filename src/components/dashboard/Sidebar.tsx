import './Sidebar.css'
import {signOut, getAuth} from 'firebase/auth'

type SidebarProps = {
  setDashboard: (profile: string) => void,
  userPhoto: string
} 

const Sidebar: React.FC<SidebarProps> = ({setDashboard, userPhoto}:SidebarProps) => { 
  const auth = getAuth()
  let userDisplayName = auth.currentUser?.displayName

  const handleLogOut = () => {
    signOut(auth)
    console.log('user is signed out')
  }
  
  return (
    <div className='sidebar-wrapper'>
      <div className='image-container'> 
        <img src={userPhoto} alt=''/>
      </div>
      {<p>{userDisplayName}</p>}
      <button onClick={() => setDashboard('chats')}>Chats</button>
      <button onClick={() => setDashboard('profile')}>Profile</button>
      <button>Settings</button>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Sidebar  
