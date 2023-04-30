import { useState } from "react"
import {
  addMessageSubCollection,
  updateRecentMessage,
} from "../config/threadFunctions"
import { auth } from "../config/firebase"
import "./Input.css"

type InputProps = {
  threadObj: any
  queryChats: () => void
}
const Input = ({ threadObj, queryChats }: InputProps) => {
  const [messageText, setMessageText] = useState<string>("")
  const handleInputSubmit = (event: any) => {
    const user = auth.currentUser
    if (event.key === "Enter") {
      addMessageSubCollection(threadObj.id, messageText).then(() => {
        setMessageText("")
        queryChats()
        updateRecentMessage(messageText, threadObj.id, user?.displayName)
      })
    }
  }
  return (
    <div className="input">
      <input
        type="text"
        placeholder="type..."
        value={messageText}
        spellCheck={true}
        onChange={(event) => setMessageText(event.target.value)}
        onKeyDown={(event) => handleInputSubmit(event)}
      />
    </div>
  )
}

export default Input
