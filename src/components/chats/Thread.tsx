import { useEffect, useState } from "react"
import "./Thread.css"
import Input from "./Input"
import { editGroupName } from "../config/threadFunctions"

type ThreadProps = {
  threadObj: any
}

const Thread = ({ threadObj }: ThreadProps) => {
  const [threadGroupName, setThreadGroupName] = useState<string>("")
  const handleGroupName = (event: any) => {
    event.preventDefault()
    setThreadGroupName(event.target.value)
  }

  useEffect(() => {
    setThreadGroupName(threadObj.groupName)
  }, [])
  return (
    <div className="thread-directory">
      <nav className="thread-nav">
        <input
          placeholder="group name"
          value={threadGroupName}
          onChange={(event) => handleGroupName(event)}
          // event that takes the update groupName function
        ></input>
        <button
          type="submit"
          onClick={() => editGroupName(threadObj.id, threadGroupName)}
        ></button>
      </nav>
      <section className="chat-window">window</section>
      <Input threadObj={threadObj} />
    </div>
  )
}

export default Thread
