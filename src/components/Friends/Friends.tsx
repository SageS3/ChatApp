import { useEffect, useState } from "react"
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  where,
  arrayUnion,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"
import "./Friends.css"
import { MdAdd } from "react-icons/md"
import Requests from "./Requests"

const Friends = () => {
  const [allFriends, setAllFriends] = useState<any>([])
  const [friendsDirectory, setFriendsDirectory] = useState<string>("all")
  const [searchFriendQuery, setSearchFriendQuery] = useState<string>("")
  const [searchFriendResults, setSearchFriendResults] = useState<any>([])
  const [users, setUsers] = useState<any>([])
  const user = auth?.currentUser

  useEffect(() => {
    queryFriends(user)
    console.log(searchFriendResults)
  }, [])

  const queryFriends = async (user: any) => {
    const q = query(collection(db, "users"), where("id", "!=", `${user?.uid}`))
    const querySnapshot = await getDocs(q)
    const userList: any = []
    querySnapshot.forEach((user: any) => {
      userList.push(user.data())
    })
    setUsers(userList)
  }

  const ListUsers = () => (
    <>
      {users.map((user: any) => (
        <div key={user.id} className="user-container">
          <div className="user-image-container">
            <img src={user.photoURL} alt="" />
          </div>
          <p>{user.userName}</p>
          {/* {user.Friends.pendingRequests} */}
          <button onClick={() => sendFriendRequestHandler(user)}>
            <MdAdd size="1.8rem" color={"rgb(77, 255, 148)"} />
          </button>
        </div>
      ))}
    </>
  )

  const updateUserSentRequests = async (
    requestedUser: any,
    currentUser: any
  ) => {
    const userID = currentUser?.uid
    const ref = doc(db, "users", userID)
    await updateDoc(ref, {
      "friends.pendingSentRequests": arrayUnion({
        userName: requestedUser.userName,
        userPhoto: requestedUser.photoURL,
        id: requestedUser.id,
      }),
    })
  }

  const updateThirdPartyPendingRequests = async (
    requestedUser: any,
    currentUser: any
  ) => {
    const thirdParyUserID = requestedUser.id

    const ref = doc(db, "users", thirdParyUserID)
    await updateDoc(ref, {
      "friends.pendingRequests": arrayUnion({
        userName: currentUser.displayName,
        userPhoto: currentUser.photoURL,
        id: currentUser.uid,
      }),
    })
  }

  const sendFriendRequestHandler = async (requestedUser: any) => {
    const currentUser = auth?.currentUser
    await updateUserSentRequests(requestedUser, currentUser)
    await updateThirdPartyPendingRequests(requestedUser, currentUser)
  }

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
        {/* {friendsDirectory === "all" && <ListFriends />} */}
        {friendsDirectory === "add" && <ListUsers />}
        {friendsDirectory === "requests" && <Requests />}
      </main>
    </div>
  )
}

export default Friends
