import { useState, useEffect } from "react"
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"
import "../Friends/Requests.css"

type User = {
  id: string
  userName: string
  userPhoto: string
}
const Requests = () => {
  const [requests, setRequests] = useState<User[]>([])

  const queryRequests = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    const users: User[] = []
    if (querySnapshot.exists()) {
      const pendingRequests = querySnapshot.data().friends.pendingRequests
      pendingRequests.forEach((userObj: User) => {
        users.push(userObj)
      })
    } else {
      console.log("no requests")
    }
    setRequests(users)
  }

  const ListRequests = () => (
    <>
      {requests.map((user: User) => (
        <div key={user.id} className="user-request-container">
          <div className="image-container">
            <img src={user.userPhoto} alt="" />
          </div>
          {user.userName}
          <button type="button" onClick={() => acceptRequest(user)}>
            Accept
          </button>
          <button type="button" onClick={() => ignoreRequest(user)}>
            Ignore
          </button>
        </div>
      ))}
    </>
  )

  const acceptRequest = async (requester: User) => {
    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)
    await updateDoc(currentUserRef, {
      "friends.friends": arrayUnion({
        userName: requester.userName,
        userPhoto: requester.userPhoto,
        id: requester.id,
      }),
      "friends.pendingRequests": arrayRemove({
        userName: requester.userName,
        userPhoto: requester.userPhoto,
        id: requester.id,
      }),
    })
    if (currentUser) {
      await updateDoc(requesterRef, {
        "friends.friends": arrayUnion({
          userName: currentUser.displayName,
          userPhoto: currentUser.photoURL,
          id: currentUser.uid,
        }),
        "friends.pendingSentRequests": arrayRemove({
          userName: currentUser.displayName,
          userPhoto: currentUser.photoURL,
          id: currentUser.uid,
        }),
      })
    }
  }

  const ignoreRequest = async (requester: User) => {
    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)
    await updateDoc(currentUserRef, {
      "friends.pendingRequests": arrayRemove({
        userName: requester.userName,
        userPhoto: requester.userPhoto,
        id: requester.id,
      }),
    })
    if (currentUser) {
      await updateDoc(requesterRef, {
        "friends.pendingSentRequests": arrayRemove({
          userName: currentUser.displayName,
          userPhoto: currentUser.photoURL,
          id: currentUser.uid,
        }),
      })
    }
  }

  useEffect(() => {
    queryRequests()
  }, [])
  return (
    <div className="main__requests">
      <ListRequests />
    </div>
  )
}

export default Requests
