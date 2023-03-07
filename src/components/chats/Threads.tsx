import { useEffect, useState } from "react"
import "./Threads.css"
import { getDocs, collection, where, query } from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"

const Threads = () => {
  const [groups, setGroups] = useState<any>([])
  const user = auth.currentUser
  const queryGroups = async () => {
    const q = query(
      collection(db, "chat"),
      where("members", "array-contains", user?.displayName)
    )
    const groupArr: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      groupArr.push(doc.data())
    })
    setGroups((prev: any) => [prev, ...groupArr])
  }

  const ListGroups = () => (
    <>
      {groups.map((group: any) => (
        <div className="group-thread" key={group.id}>
          <p>{group.createdBy}</p>
        </div>
      ))}
    </>
  )

  useEffect(() => {
    queryGroups()

    console.log(groups)
  }, [])
  return (
    <div className="threads">
      <ListGroups />
    </div>
  )
}

export default Threads
