import { useEffect, useState, useMemo, useCallback } from "react"
import { IoSkullOutline } from "react-icons/io5"
import "./Threads.css"
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"
import { BsThreeDotsVertical } from "react-icons/bs"

type ThreadsProps = {
  setDashboard: (a: string) => void
  setThreadObj: (a: Object | null) => void
}

const Threads = ({ setDashboard, setThreadObj }: ThreadsProps) => {
  const [groups, setGroups] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [clickedItemId, setclickedItemId] = useState<string | null>(null)

  const user = auth.currentUser

  // the function below gets all of the user's chat threads and stores
  // it in state...
  const queryGroups = async () => {
    const q = query(
      collection(db, "chat"),
      where("createdBy", "==", user?.uid),
      orderBy("recentMessage.readBy.sentAt", "desc")
    )
    const groupArr: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      groupArr.push(doc.data())
    })
    // setGroups((prev: []) => [...prev, ...groupArr])
    console.log("query")
    setGroups(groupArr)
  }

  const deleteThread = async (event: any, groupId: string) => {
    setIsOpen(false)
    event.stopPropagation()
    await deleteDoc(doc(db, "chat", groupId)).then(queryGroups)
    await deleteDoc(doc(db, "message", groupId))
  }

  const handleMenuSlide = (event: any, id: string) => {
    event.stopPropagation()
    setclickedItemId(id)
    setIsOpen(!isOpen)
  }

  const handleThreadId = (group: Object) => {
    setThreadObj(group)
    setDashboard("chat")
  }

  useEffect(() => {
    queryGroups()
    return () => {
      queryGroups()
    }
  }, [])

  // const memoizeData = () => useMemo(() => {}, [groups])

  const ListThreads = () => (
    <>
      {groups.map((group: any) => (
        <div
          className="thread"
          key={group.id}
          onClick={() => handleThreadId(group)}
        >
          <p className="thread__last-message-text">
            {new Date(
              group.recentMessage.readBy.sentAt.seconds * 1000
            ).toLocaleTimeString()}
          </p>
          <p className="thread__group-name">{group.groupName}</p>
          {group.recentMessage.messageText === null ? (
            <p>No message yet...</p>
          ) : (
            <p>{group.recentMessage.messageText}</p>
          )}
          <button
            type="button"
            className={
              isOpen && clickedItemId === group.id
                ? "thread-menu open"
                : "thread-menu"
            }
            onClick={(e) => handleMenuSlide(e, group.id)}
          >
            <BsThreeDotsVertical size={"3em"} color={"rgb(77, 255, 148)"} />
          </button>
          {clickedItemId === group.id && (
            <ul
              className={
                isOpen === true ? "delete-button" : "delete-button closed"
              }
              onClick={(e) => deleteThread(e, group.id)}
            >
              <IoSkullOutline size={"2.5em"} />
            </ul>
          )}
        </div>
      ))}
    </>
  )

  return (
    <div className="threads">
      <ListThreads />
    </div>
  )
}

export default Threads
