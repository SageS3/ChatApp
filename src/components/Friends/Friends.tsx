import { useEffect, useState } from "react"
import { BiMessageSquareEdit } from "react-icons/bi"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"
import "./Friends.css"
import Requests from "./Requests"
import AddFriends from "./AddFriends"
import { LimitedUserObj } from "./updateDocUtils"

const Friends = () => {
  const [friendsDirectory, setFriendsDirectory] = useState<string>("all")

  const [friends, setFriends] = useState<LimitedUserObj[]>([])

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
  }

  const ListFriends = () => (
    <>
      {friends.map((user: LimitedUserObj) => (
        <div key={user.id} className="friend-container">
          <div className="friend-image-container">
            <img src={user.userPhoto} alt="" />
          </div>
          <p>{user.userName}</p>
          <button>
            <BiMessageSquareEdit size={"2.2em"} color={"rgb(77, 255, 148)"} />
          </button>
        </div>
      ))}
    </>
  )

  useEffect(() => {
    queryFriends()
  }, [])

  return (
    <div className="friends">
      <header className="friends__header">
        <ul>
          <li>Friends</li>
          <li>
            <button type="button" onClick={() => setFriendsDirectory("all")}>
              All
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setFriendsDirectory("add")}>
              Add Friends
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setFriendsDirectory("requests")}
            >
              Requests
            </button>
          </li>
        </ul>
      </header>
      <main className="friends--list">
        {friendsDirectory === "all" && <ListFriends />}
        {friendsDirectory === "add" && <AddFriends />}
        {friendsDirectory === "requests" && <Requests />}
      </main>
    </div>
  )
}

export default Friends
