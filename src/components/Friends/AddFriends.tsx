import { useState, useEffect } from "react"
import { auth } from "../config/firebase"
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { MdAdd } from "react-icons/md"
type User = {
  friends: {}
  id: string
  photoURL: string
  userName: string
}

type FriendObj = {
  id: string
  userName: string
  userPhoto: string
}
const AddFriends = () => {
  const [pendingSentRequestsIDs, setPendingSentRequestsIDs] = useState<
    string[]
  >([])
  const [pendingRequestsIDs, setPendingRequestsIDs] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])
  const user = auth?.currentUser
  const sendFriendRequestHandler = async (requestedUser: any) => {
    const currentUser = auth?.currentUser
    await updateUserSentRequests(requestedUser, currentUser)
    await updateThirdPartyPendingRequests(requestedUser, currentUser)
    await getPendingUserRequestsIDs()
  }
  const queryUsers = async (user: any) => {
    //
    const q = query(collection(db, "users"), where("id", "!=", `${user?.uid}`))
    const querySnapshot = await getDocs(q)
    const userList: any = []
    querySnapshot.forEach((user: any) => {
      userList.push(user.data())
    })
    setUsers(userList)
  }
  const updateThirdPartyPendingRequests = async (
    //
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
  const getPendingUserRequestsIDs = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const docs = await getDoc(ref)

    if (docs.exists()) {
      const pendingSentRequestsArr = docs.data().friends.pendingSentRequests
      const pendingRequestsArr = docs.data().friends.pendingRequests
      if (pendingRequestsArr) {
        const pendingRequestsIdArr = pendingRequestsArr.map(
          (user: FriendObj) => {
            return user.id
          }
        )
        setPendingRequestsIDs(pendingRequestsIdArr)
      }
      if (pendingSentRequestsArr) {
        const pendingSentRequestsIdArr = pendingSentRequestsArr.map(
          (user: FriendObj) => {
            return user.id
          }
        )
        setPendingSentRequestsIDs(pendingSentRequestsIdArr)
      }
    } else {
      console.log("doc not found")
    }
  }

  const buttonState = (userID: string, userObj: User) => {
    //
    if (pendingSentRequestsIDs.includes(userID)) {
      return <div className="pending-text">Pending...</div>
    }
    if (pendingRequestsIDs.includes(userID)) {
      return (
        <button onClick={() => addFriendHandler(userObj)}>
          <MdAdd size="1.8rem" color={"rgb(77, 255, 148)"} />
        </button>
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
    //
    <>
      {users.map((user: User) => (
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

  const addFriendHandler = (user: User) => {
    // from the pendingRequests array, the listed user click event will add that user's obj to the friends arr in Firebase
    // this function will also handle adding the current user Obj to that selected user's friends arr in Firebase.
    // resulting in the request being accepted
    console.log(user)
  }
  useEffect(() => {
    getPendingUserRequestsIDs() //
    queryUsers(user) //
  }, [])
  return (
    <>
      <ListUsers />
    </>
  )
}

export default AddFriends
