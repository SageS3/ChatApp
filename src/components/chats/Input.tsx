import { useState, useRef, useEffect } from "react"
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
  const messageRef = useRef<HTMLInputElement>(null)
  const handleInputSubmit = (event: any) => {
    const user = auth.currentUser
    if (event.key === "Enter") {
      addMessageSubCollection(threadObj.id, messageText).then(() => {
        queryChats()
        updateRecentMessage(messageText, threadObj.id, user?.displayName)
        setMessageText("")
      })
    }
  }

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus()
    }
  }, [])

  return (
    <div className="input">
      <input
        ref={messageRef}
        type="text"
        placeholder="type..."
        spellCheck={true}
        value={messageText}
        onChange={(event) => setMessageText(event.target.value)}
        onKeyDown={(event) => handleInputSubmit(event)}
      />
    </div>
  )
}

export default Input
