import Sidebar from './Sidebar' 
import './Dashboard.css'
import { useNavigate} from 'react-router-dom'; 

type DashboardProps = { 
  userData: object,
}
function Dashboard({userData}:DashboardProps) {
  const navigate = useNavigate()   
  console.log(userData)

  return (
    <div className='user-dashboard'> 
      <nav> 
        <button type='button' onClick={() => navigate('/')}>Logout</button>
      </nav>
      <Sidebar></Sidebar> 
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