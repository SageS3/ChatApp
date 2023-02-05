import { useEffect } from "react"
import Input from "./Input"
import Threads from "./Threads"
import "./chats.css"

type ChatsProps = {
  setDashboard: (a: string) => void
}

const Chats = ({ setDashboard }: ChatsProps) => {
  useEffect(() => {}, [])

  return (
    <div className="main__chats">
      <header className="header">
        <button className="button" onClick={() => setDashboard("friends")}>
          Friends
        </button>
      </header>
      <Threads />
      <Input />
    </div>
  )
}

export default Chats
