import { useEffect, useState } from "react"
import "./Threads.css"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../config/firebase"

const Threads = () => {
  const [groups, setGroups] = useState<{}[]>([])

  const listGroups = async () => {
    const querySnapshot = await getDocs(collection(db, "chat"))
    querySnapshot.forEach((doc) => {
      setGroups((prev) => [...prev, doc.data()])
    })
    console.log(groups)
  }

  useEffect(() => {
    listGroups()
  }, [])
  return <div className="threads"></div>
}

export default Threads
