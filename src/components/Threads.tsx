import { useEffect} from 'react' 
import './Threads.css' 

const Threads = () => {  
  // const [userMessages, setUserMessages] = useState<{}[]>([])

  useEffect(() => { 
    console.log('threads component mounted') 
  },[])

  return (
    <div className='threads-wrapper'>  
     <div className='input_container'> 
      <textarea placeholder='Type here...'></textarea>
     </div>
    </div>
  )
} 

export default Threads
