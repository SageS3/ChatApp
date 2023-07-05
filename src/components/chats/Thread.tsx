import { useEffect, useState } from "react"
import "./Thread.css"
import Input from "./Input"
import { editGroupName } from "../config/threadFunctions"
import { query, collection, getDocs, limit, orderBy } from "firebase/firestore"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"

type ThreadProps = {
  threadObj: any
  userPhoto: any
}

const Thread = ({ threadObj, userPhoto }: ThreadProps) => {
  const [threadGroupName, setThreadGroupName] = useState<string>("")
  const [chats, setChats] = useState<any>([])
  const handleGroupName = (event: any) => {
    event.preventDefault()
    setThreadGroupName(event.target.value)
  }

  const queryChats = async () => {
    const q = query(
      collection(db, `message/${threadObj.id}/messages`),
      orderBy("sentAt"),
      limit(20)
    )
    const chatsArr: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      chatsArr.push(doc.data())
    })
    setChats(chatsArr)
  }
  const user = auth.currentUser
  const ListChats = () => (
    <div className="chat-window">
      {chats.map((chat: any) => (
        <div className="chat-container" key={chat.sentAt}>
          <div>
            <img className="image-container" src={userPhoto} alt=""></img>
          </div>
          <p>{chat.message}</p>
        </div>
      ))}
    </div>
  )

  useEffect(() => {
    setThreadGroupName(threadObj.groupName)
    queryChats()
    return () => {
      setThreadGroupName("")
      setChats([])
    }
  }, [])

  return (
    <div className="thread-directory">
      <nav className="thread-nav">
        <input
          placeholder="group name"
          value={threadGroupName}
          onChange={(event) => handleGroupName(event)}
        ></input>
        <button
          type="submit"
          onClick={() => editGroupName(threadObj.id, threadGroupName)}
        >
          update
        </button>
      </nav>
      <ListChats></ListChats>
      <Input threadObj={threadObj} queryChats={queryChats} />
    </div>
  )
}

export default Thread
