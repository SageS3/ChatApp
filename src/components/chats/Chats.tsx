import { useEffect } from "react"
import Input from "./Input"
import Threads from "./Threads"
import "./chats.css"

const Chats = () => {
  // const [userMessages, setUserMessages] = useState<{}[]>([])

  useEffect(() => {
    console.log("chats component mounted")
  }, [])

  return (
    <div className="main__chats">
      <header className="header">header</header>
      <Threads />
      <Input />
    </div>
  )
}

export default Chats
