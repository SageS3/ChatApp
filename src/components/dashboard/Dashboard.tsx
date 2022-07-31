import {useState} from 'react'
import Sidebar from '../dashboard/Sidebar'
import './Dashboard.css'
import {signOut, getAuth} from 'firebase/auth'
import Profile from '../Profile'

type DashboardProps = { 
  userData: {[key: string]: any}, 
}
function Dashboard({userData}:DashboardProps) { 
  const [profile, setProfile] = useState<boolean>(false)
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

  const userInput = () => ( 
      <div className='user-input'> 
        <input></input>
      </div>
  )

  return (
    <div className='user-dashboard'> 
      <nav> 
        <button type='button' onClick={handleLogOut}>Logout</button>
      </nav>
      <Sidebar 
        userData={userData} 
        setProfile={setProfile}
      ></Sidebar> 
      <main> 
        {profile && <Profile/>}
      </main>  
      {profile === false && 
        userInput()
      }
    </div>
  )
}

export default Dashboard