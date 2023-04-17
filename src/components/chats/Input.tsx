import { useState } from "react"
import { addMessageSubCollection } from "../config/threadFunctions"
import "./Input.css"

type InputProps = {
  threadObj: any
}
const Input = ({ threadObj }: InputProps) => {
  const [messageText, setMessageText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleInputSubmit = () => {
    setIsLoading(true)
    addMessageSubCollection(threadObj.id, messageText).then(() => {
      setMessageText("")
    })
    setIsLoading(false)
  }
  return (
    <div className="input">
      <input
        type="text"
        placeholder="type..."
        value={messageText}
        spellCheck={true}
        onChange={(event) => setMessageText(event.target.value)}
      />
      <button type="button" onClick={() => handleInputSubmit()}>
        send
      </button>
    </div>
  )
}

export default Input
