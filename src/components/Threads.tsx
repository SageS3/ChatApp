import { useEffect } from "react"
import "./Threads.css"

const Threads = () => {
  // const [userMessages, setUserMessages] = useState<{}[]>([])

  useEffect(() => {
    console.log("threads component mounted")
  }, [])

  return (
    <main className="main">
      <div className="input">
        <textarea
          className="input__textarea"
          placeholder="Type here..."
        ></textarea>
      </div>
    </main>
  )
}

export default Threads
