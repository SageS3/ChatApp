import Sidebar from './Sidebar' 
import './Dashboard.css'
import {signOut, getAuth} from 'firebase/auth'

type DashboardProps = {  
  userData: {[key: string]: any}, 
  setIsLoggedIn: (a:boolean) => void
}
function Dashboard({userData}:DashboardProps) { 
  const auth = getAuth() 

  const handleSignOut = () => { 
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
        <button type='button' onClick={handleSignOut}>Logout</button>
      </nav>
      <Sidebar userData={userData}></Sidebar> 
      <main> 
        <div></div>
      </main> 
      <div className='user-input'> 
        <input></input>
      </div>
    </div>
  )
}

export default Dashboard