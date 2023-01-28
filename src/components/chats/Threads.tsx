import { useEffect } from "react"
import "./Threads.css"

const Threads = () => {
  // const [userMessages, setUserMessages] = useState<{}[]>([])

  useEffect(() => {
    console.log("threads component mounted")
  }, [])

  return <main className="main"></main>
}

export default Threads
