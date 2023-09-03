import { useEffect, useState, useMemo } from "react"
import {
  getDoc,
  doc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore"
import { db, auth } from "../config/firebase"
import "./Friends.css"
import Requests from "./Requests"
import AddFriends from "./AddFriends"
import {
  LimitedUserObj,
  FullUserObj,
  populateFriends,
  populateRequests,
} from "./updateDocUtils"
import { MappedUsers } from "./reusable"

const Friends = () => {
  const [friendsDirectory, setFriendsDirectory] = useState<string>("all")
  const [friends, setFriends] = useState<FullUserObj[]>([])
  const [users, setUsers] = useState<FullUserObj[]>([])
  const [requests, setRequests] = useState<FullUserObj[]>([])
  const [requestIDs, setRequestIDs] = useState<string[]>([])
  const [friendIDs, setFriendIDs] = useState<string[]>([])
  const [hasRequests, setHasRequests] = useState<boolean>(false)

  const queryUsers = async (user: any) => {
    const q = query(collection(db, "users"), where("id", "!=", `${user?.uid}`))
    try {
      const snapShot = await getDocs(q)
      const userData = snapShot.docs.map((doc) => doc.data() as FullUserObj)
      setUsers(userData)
      console.log(userData)
    } catch (error) {
      console.log(error)
    }
  }

  const queryRequests = async (userID: string | undefined) => {
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    try {
      const pendingReqs = querySnapshot.data()?.friends.pendingRequests
      const pendingRequestsIds = pendingReqs.map(
        (userObj: LimitedUserObj) => userObj.id
      )
      pendingRequestsIds.length && setHasRequests(true)
      setRequestIDs(pendingRequestsIds)
      setRequests(populateRequests(users, requestIDs))
    } catch (error) {
      console.log(error)
    }
  }

  const queryFriends = async (userID: string | undefined) => {
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    try {
      const friendsArr = querySnapshot.data()?.friends.friends
      const idArr = friendsArr.map((userObj: LimitedUserObj) => userObj.id)
      setFriendIDs(idArr)
      setFriends(populateFriends(users, friendIDs))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const currentUser = auth?.currentUser
    const userID = currentUser?.uid
    queryUsers(currentUser)
    queryFriends(userID)
    queryRequests(userID)
  }, [])

  type ButtonProps = {
    selected: boolean
    id: string
    onClick: () => void
  }

  const Button = ({ selected, id, onClick }: ButtonProps) => (
    <button className={selected ? "selected" : ""} onClick={onClick}>
      {id}
    </button>
  )

  const memoizedNotificationIndicator = useMemo(
    () => <div className="request--indicator"></div>,
    [hasRequests]
  )

  const handleButtonClick = (directory: string) => {
    setFriendsDirectory(directory)
  }

  const renderUsers = () =>
    friendsDirectory === "all" && <MappedUsers userArr={friends} />

  return (
    <div className="friends">
      <header className="friends__header">
        <ul>
          <li>Friends</li>
          <li>
            <Button
              selected={friendsDirectory === "all"}
              id="All"
              onClick={() => handleButtonClick("all")}
            />
          </li>
          <li>
            <Button
              selected={friendsDirectory === "add"}
              id="Add Friends"
              onClick={() => handleButtonClick("add")}
            />
          </li>
          <li>
            <Button
              selected={friendsDirectory === "requests"}
              id="Requests"
              onClick={() => handleButtonClick("requests")}
            />
            {hasRequests && memoizedNotificationIndicator}
          </li>
        </ul>
      </header>
      <main className="friends--list">
        {friendsDirectory === "all" && renderUsers()}
        {friendsDirectory === "add" && <AddFriends users={users} />}
        {friendsDirectory === "requests" && (
          <Requests
            requestIDs={requestIDs}
            requests={requests}
            setRequestIDs={setRequestIDs}
            users={users}
            setRequests={setRequests}
          />
        )}
      </main>
    </div>
  )
}

export default Friends
