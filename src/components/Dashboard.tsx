import Sidebar from './Sidebar' 
import './Dashboard.css'
import { useNavigate} from 'react-router-dom'; 

function Dashboard() {
  const navigate = useNavigate() 

  return (
    <div className='user-dashboard'> 
      <nav> 
        <button type='button' onClick={() => navigate('/')}>Logout</button>
      </nav>
      <Sidebar></Sidebar> 
      <main> 
        <div>chats</div>
      </main> 
      <div className='user-input'> 
        <input></input>
      </div>
    </div>
  )
}

export default Dashboard