import { addGroup } from "../config/createChat"
import Threads from "./Threads"
import { BiMessageSquareEdit } from "react-icons/bi"
import { FaUserFriends } from "react-icons/fa"
import "./chats.css"

type ChatsProps = {
  setDashboard: (a: string) => void
}

const Chats = ({ setDashboard }: ChatsProps) => {
  const createMessage = () => {
    setDashboard("chat")
    addGroup()
  }

  return (
    <div className="main__chats">
      <header className="header">
        <button className="button" onClick={() => setDashboard("friends")}>
          <FaUserFriends size={"2.2em"} color={"rgb(255,6,200)"} />
        </button>
        <button
          className="chats-nav-create_message button"
          onClick={() => createMessage()}
        >
          <BiMessageSquareEdit size={"2.2em"} color={"rgb(255,6,200)"} />
        </button>
      </header>
      <Threads setDashboard={setDashboard} />
    </div>
  )
}

export default Chats
