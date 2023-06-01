import { useState, useEffect } from "react"
import { auth } from "../config/firebase"
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { MdAdd } from "react-icons/md"
import {
  updateUserSentRequests,
  updateThirdPartyPendingRequests,
  acceptRequestFromListedUsers,
  LimitedUserObj,
  FullUserObj,
} from "./updateDocUtils"

const AddFriends = () => {
  const [pendingSentRequestsIDs, setPendingSentRequestsIDs] = useState<
    string[]
  >([])
  const [pendingRequestsIDs, setPendingRequestsIDs] = useState<string[]>([])
  const [friendsIDs, setFriendsIDs] = useState<string[]>([])
  const [users, setUsers] = useState<FullUserObj[]>([])
  const user = auth?.currentUser

  const sendFriendRequestHandler = async (requestedUser: any) => {
    const currentUser = auth?.currentUser
    await updateUserSentRequests(requestedUser, currentUser)
    await updateThirdPartyPendingRequests(requestedUser, currentUser)
    await getUserIDs()
  }
  const queryUsers = async (user: any) => {
    const q = query(collection(db, "users"), where("id", "!=", `${user?.uid}`))
    const querySnapshot = await getDocs(q)
    const userList: any = []
    querySnapshot.forEach((user: any) => {
      userList.push(user.data())
    })
    setUsers(userList)
  }

  const getUserIDs = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const docs = await getDoc(ref)

    if (docs.exists()) {
      const pendingSentRequestsArr = docs.data().friends.pendingSentRequests
      const pendingRequestsArr = docs.data().friends.pendingRequests
      const friendsArr = docs.data().friends.friends
      if (pendingRequestsArr) {
        const pendingRequestsIdArr = pendingRequestsArr.map(
          (user: LimitedUserObj) => {
            return user.id
          }
        )
        setPendingRequestsIDs(pendingRequestsIdArr)
      }
      if (pendingSentRequestsArr) {
        const pendingSentRequestsIdArr = pendingSentRequestsArr.map(
          (user: LimitedUserObj) => {
            return user.id
          }
        )
        setPendingSentRequestsIDs(pendingSentRequestsIdArr)
      }
      if (friendsArr) {
        const friendsIdArr = friendsArr.map((user: LimitedUserObj) => {
          return user.id
        })
        setFriendsIDs(friendsIdArr)
      }
    } else {
      console.log("doc not found")
    }
  }

  const buttonState = (userID: string, userObj: FullUserObj) => {
    //
    if (pendingSentRequestsIDs.includes(userID)) {
      return <div className="pending-text">Pending...</div>
    }
    if (friendsIDs.includes(userID)) {
      return <div className="button-state__friends">Friends</div>
    }
    if (pendingRequestsIDs.includes(userID)) {
      return (
        <div>
          <button onClick={() => acceptRequestFromListedUsers(userObj)}>
            Accept
          </button>
          <button type="button">Ignore</button>
        </div>
      )
    }
    if (
      !pendingRequestsIDs.includes(userID) &&
      !pendingSentRequestsIDs.includes(userID)
    ) {
      return (
        <button onClick={() => sendFriendRequestHandler(userObj)}>
          <MdAdd size="1.8rem" color={"rgb(77, 255, 148)"} />
        </button>
      )
    }
  }
  const ListUsers = () => (
    <>
      {users.map((user: FullUserObj) => (
        <div key={user.id} className="user-container">
          <div className="user-image-container">
            <img src={user.photoURL} alt="" />
          </div>
          <p>{user.userName}</p>

          {buttonState(user.id, user)}
        </div>
      ))}
    </>
  )

  useEffect(() => {
    getUserIDs()
    queryUsers(user)
  }, [])
  return (
    <>
      <ListUsers />
    </>
  )
}

export default AddFriends
