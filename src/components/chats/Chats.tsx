import { addGroup } from "../config/threadFunctions"
import Threads from "./Threads"
import { BiMessageSquareEdit } from "react-icons/bi"
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
        <ul className="header__ul">
          <li>Chats</li>
          <li>
            <button
              className="chats-nav-create_message button"
              onClick={() => createMessage()}
            >
              <BiMessageSquareEdit size={"2.2em"} color={"rgb(39 194 160)"} />
            </button>
          </li>
        </ul>
      </header>
      <section className="section__friends-list"></section>
      <Threads setDashboard={setDashboard} setThreadObj={setThreadObj} />
    </div>
  )
}

export default Chats
