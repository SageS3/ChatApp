import React, { useEffect } from "react"
import "./chats.css"

const Chats = () => {
  // const [userMessages, setUserMessages] = useState<{}[]>([])

  useEffect(() => {
    console.log("chats component mounted")
  }, [])

  return (
    <>
      <header className="main__header">header</header>
    </>
  )
}

export default Chats
