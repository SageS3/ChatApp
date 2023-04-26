import { useState } from "react"
import {
  addMessageSubCollection,
  updateRecentMessage,
} from "../config/threadFunctions"
import "./Input.css"

type InputProps = {
  threadObj: any
  queryChats: () => void
}
const Input = ({ threadObj, queryChats }: InputProps) => {
  const [messageText, setMessageText] = useState<string>("")

  const handleInputSubmit = (event: any) => {
    if (event.key === "Enter") {
      addMessageSubCollection(threadObj.id, messageText).then(() => {
        setMessageText("")
        queryChats()
        updateRecentMessage(messageText, threadObj.id)
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
