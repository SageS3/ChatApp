import { useEffect, useState } from "react"
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
    const querySnapshot = await getDocs(q)
    const userList: any = []
    querySnapshot.forEach((user: any) => {
      userList.push(user.data())
    })
    setUsers(userList)
    console.log(users)
  }

  const queryRequests = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    const requestsArr: string[] = []
    if (querySnapshot.exists()) {
      const pendingRequests = querySnapshot.data().friends.pendingRequests
      pendingRequests.forEach((userObj: LimitedUserObj) => {
        requestsArr.push(userObj.id)
      })
    } else {
      console.log("no requests")
    }
    setRequestIDs(requestsArr)
    if (requestIDs.length > 0) {
      setHasRequests(true)
    }
    populateRequests(users, requestIDs, setRequests)
  }

  const queryFriends = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    const friendsObjArr: string[] = []
    if (querySnapshot.exists()) {
      const friendsArr = querySnapshot.data().friends.friends
      friendsArr.forEach((userObj: LimitedUserObj) => {
        friendsObjArr.push(userObj.id)
      })
    } else {
      console.log("no requests")
    }
    setFriendIDs(friendsObjArr)
    console.log(friends)
    populateFriends(users, friendIDs, setFriends)
  }

  const populateState = () => {
    const currentUser = auth?.currentUser
    queryUsers(currentUser)
    queryFriends()
  }

  useEffect(() => {
    populateState()
  }, [])

  type ButtonProps = {
    selected: boolean
    id: string
    onClick: () => void
  }

  const Button = ({ selected, id, onClick }: ButtonProps) => (
    <button
      className={selected ? "selected" : ""}
      onClick={onClick}
      id={id === "Requests" && hasRequests ? "requests" : ""}
    >
      {id}
    </button>
  )

  const handleButtonClick = (directory: string) => {
    setFriendsDirectory(directory)
  }

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
          </li>
        </ul>
      </header>
      <main className="friends--list">
        {friendsDirectory === "all" && <MappedUsers userArr={friends} />}
        {friendsDirectory === "add" && <AddFriends users={users} />}
        {friendsDirectory === "requests" && (
          <Requests
            requestIDs={requestIDs}
            requests={requests}
            setRequestIDs={setRequestIDs}
            queryRequests={queryRequests}
            users={users}
            setRequests={setRequests}
          />
        )}
      </main>
    </div>
  )
}

export default Friends
