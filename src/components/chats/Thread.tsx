import { useEffect, useState } from "react"
import { editGroupName } from "../config/createChat"
import "./Thread.css"
import Input from "./Input"

type ThreadProps = {
  threadObj: object | null
}

const Thread = ({ threadObj }: ThreadProps) => {
  const [threadGroupName, setThreadGroupName] = useState<string>("")
  const handleGroupName = (event: any) => {
    event.preventDefault()
    setThreadGroupName(event.target.value)
    // editGroupName(groupId, groupName)
  }
  useEffect(() => {
    // setGroupName(threadObj.groupName)
    console.log(threadObj)
  }, [])
  return (
    <div className="thread-directory">
      <nav className="thread-nav">
        <input
          placeholder="group name"
          value={threadGroupName}
          onChange={(event) => handleGroupName(event)}
        ></input>
      </nav>
      <section className="chat-window">window</section>
      <Input />
    </div>
  )
}

export default Thread
