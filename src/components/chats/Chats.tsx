import { addGroup } from "../config/threadFunctions"
import Threads from "./Threads"
import { BiMessageSquareEdit } from "react-icons/bi"
import { FaUserFriends } from "react-icons/fa"
import "./chats.css"

type ChatsProps = {
  setDashboard: (a: string) => void
  setThreadObj: (a: Object | null) => void
}

const Chats = ({ setDashboard, setThreadObj }: ChatsProps) => {
  const createMessage = async () => {
    await addGroup(setThreadObj)
    setDashboard("chat")
  }

  return (
    <div className="main__chats">
      <header className="header">
        <button className="button" onClick={() => setDashboard("friends")}>
          <FaUserFriends size={"2.2em"} color={"rgb(77, 255, 148)"} />
        </button>
        <button
          className="chats-nav-create_message button"
          onClick={() => createMessage()}
        >
          <BiMessageSquareEdit size={"2.2em"} color={"rgb(77, 255, 148)"} />
        </button>
      </header>
      <Threads setDashboard={setDashboard} setThreadObj={setThreadObj} />
    </div>
  )
}

export default Chats
