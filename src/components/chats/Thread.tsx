import { useState } from "react"
import { editGroupName } from "../config/createChat"
import "./Thread.css"
import Input from "./Input"

const Thread = () => {
  const [groupName, setGroupName] = useState<string>("")
  const handleGroupName = (event: any) => {
    event.preventDefault()
    setGroupName(event.target.value)
    // editGroupName(groupId, groupName)
  }

  return (
    <div className="thread-directory">
      <nav className="thread-nav">
        <input
          placeholder="group name"
          value={groupName}
          onChange={(event) => handleGroupName(event)}
        ></input>
      </nav>
      <section className="chat-window">window</section>
      <Input />
    </div>
  )
}

export default Thread
