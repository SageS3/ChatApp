import {useState} from 'react'
import Sidebar from '../dashboard/Sidebar'
import './Dashboard.css'
import {signOut, getAuth} from 'firebase/auth'
import Profile from '../Profile'
import Threads from '../Threads'

type DashboardProps = { 
  userData: {[key: string]: any}, 
}
function Dashboard({userData}:DashboardProps) { 
  const [dashboard, setDashboard] = useState<string>('chats')
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

  return (
    <div className='user-dashboard'> 
      <nav> 
        <button type='button' onClick={handleLogOut}>Logout</button>
      </nav>
      <Sidebar 
        userData={userData} 
        setDashboard={setDashboard}
      ></Sidebar> 
      <main> 
        {dashboard === 'profile' && <Profile/>} 
        {dashboard === 'chats' && <Threads/>}
      </main>  
    </div>
  )
}

export default Dashboard