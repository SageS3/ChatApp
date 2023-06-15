import { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"
import "./Friends.css"
import Requests from "./Requests"
import AddFriends from "./AddFriends"
import { LimitedUserObj } from "./updateDocUtils"
import { MappedUsers } from "./reusable"

const Friends = () => {
  const [friendsDirectory, setFriendsDirectory] = useState<string>("all")
  const [friends, setFriends] = useState<LimitedUserObj[]>([])
  const [hasRequests, setHasRequests] = useState<boolean>(false)
  const queryFriends = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    const friendsObjArr: LimitedUserObj[] = []
    if (querySnapshot.exists()) {
      const friendsArr = querySnapshot.data().friends.friends
      friendsArr.forEach((userObj: LimitedUserObj) => {
        friendsObjArr.push(userObj)
      })
    } else {
      console.log("no requests")
    }
    setFriends(friendsObjArr)
    console.log(friends)
  }

  useEffect(() => {
    queryFriends()
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
        {friendsDirectory === "add" && <AddFriends />}
        {friendsDirectory === "requests" && (
          <Requests setHasRequests={setHasRequests} />
        )}
      </main>
    </div>
  )
}

export default Friends
