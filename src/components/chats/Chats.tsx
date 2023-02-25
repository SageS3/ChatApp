import { addGroup } from "../config/createChat"
import Input from "./Input"
import Threads from "./Threads"
import "./chats.css"

type ChatsProps = {
  setDashboard: (a: string) => void
}

const Chats = ({ setDashboard }: ChatsProps) => {
  return (
    <div className="main__chats">
      <header className="header">
        <button className="button" onClick={() => setDashboard("friends")}>
          Friends
        </button>
        <button className="button" onClick={() => addGroup()}>
          create message
        </button>
      </header>
      <Threads />
    </div>
  )
}

export default Chats
