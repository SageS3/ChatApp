import {useState, useEffect} from 'react' 
import {db} from '../components/config/firebase'
import {collection,getDocs,query,limit,onSnapshot} from "firebase/firestore"; 
import './Threads.css' 

const Threads = () => {  
  const [userMessages, setUserMessages] = useState<string[]>([])
  const messagesRef = collection(db, 'messages')
  const q = query(collection(db, 'messages'), limit(10))
 
  const getMessages = async () => {
    const {docs} = await getDocs(q)  
    
  }   

  const mapMessages = () => { 
    return( 
      userMessages.map((message, i) => ( 
        <div key={i}> 
          {message}
        </div>
      ))
    )
  }

  useEffect(() => { 
    getMessages()
  }, [])

  return (
    <div className='threads-wrapper'>  
      <div className='chats-container'> 
      {mapMessages()}
      </div>
      <div className='input-wrapper'> 
        <input></input>
      </div>
    </div>
  )
} 

export default Threads
