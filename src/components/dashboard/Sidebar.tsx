import './Sidebar.css'
import {signOut, getAuth} from 'firebase/auth'


type SidebarProps = { 
  userData: {[key: string]: any}
} 

const handleSignOut = () => {  
  const auth = getAuth()
  signOut(auth) 
  .then(() => { 
    console.log('user is signed out')
  }) 
  .catch(error => {  
    console.log(error)
  })
} 

function Sidebar({userData}:SidebarProps) {
  return (
    <div className='sidebar-wrapper'> 
      <div className='image-container'></div> 
      <p>{userData.email}</p>
      <button>Chats</button>
      <button>Profile</button>
      <button>Settings</button>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  )
}

export default Sidebar