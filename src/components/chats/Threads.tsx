import { useEffect, useState } from "react"
import "./Threads.css"
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"
import { AiOutlineDelete } from "react-icons/ai"

type ThreadsProps = {
  setDashboard: (a: string) => void
  setThreadObj: (a: string | null) => void
}

const Threads = ({ setDashboard, setThreadObj }: ThreadsProps) => {
  const [groups, setGroups] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const user = auth.currentUser

  // the function below gets all of the user's chat threads and stores
  // it in state...
  const queryGroups = async () => {
    const q = query(
      collection(db, "chat"),
      where("members", "array-contains", user?.uid)
    )
    const groupArr: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      groupArr.push(doc.data())
    })
    setGroups(groupArr)
  }

  const deleteThread = async (event: any, groupId: string) => {
    setLoading(true)
    event.stopPropagation()
    await deleteDoc(doc(db, "chat", groupId)).then(queryGroups)
    await deleteDoc(doc(db, "message", groupId))
    setLoading(false)
  }

  const handleThreadId = (groupID: string) => {
    setDashboard("chat")
    setThreadObj(groupID)
  }

  const ListThreads = () => (
    <div className="group-thread">
      {groups.map((group: any) => (
        <div
          className="thread"
          key={group.id}
          onClick={() => handleThreadId(group)}
        >
          <button
            disabled={loading}
            type="button"
            className="delete-thread"
            onClick={(e) => deleteThread(e, group.id)}
          >
            <AiOutlineDelete size={"2em"} color={"rgb(205, 0, 80)"} />
          </button>
        </div>
      ))}
    </div>
  )

  useEffect(() => {
    queryGroups()
  }, [])

  return (
    <div className="threads">
      <ListThreads />
    </div>
  )
}

export default Threads
