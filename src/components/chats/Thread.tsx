import { useEffect, useState } from "react"
import "./Thread.css"
import Input from "./Input"
import { editGroupName } from "../config/threadFunctions"
import { query, collection, getDocs, limit } from "firebase/firestore"
import { db, auth } from "../config/firebase"

type ThreadProps = {
  threadObj: any
}

const Thread = ({ threadObj }: ThreadProps) => {
  const [threadGroupName, setThreadGroupName] = useState<string>("")
  const [chats, setChats] = useState<any>([])
  const user = auth.currentUser
  const handleGroupName = (event: any) => {
    event.preventDefault()
    setThreadGroupName(event.target.value)
  }

  useEffect(() => {
    setThreadGroupName(threadObj.groupName)
    queryChats()
  }, [])

  const queryChats = async () => {
    const q = query(
      collection(db, `message/${threadObj.id}/messages`),
      limit(20)
    )
    const chats: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      chats.push(doc.data())
    })
    setChats(chats)
  }

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
      <section className="chat-window">{/* {<ListChats/>} */}</section>
      <Input threadObj={threadObj} />
    </div>
  )
}

export default Thread
