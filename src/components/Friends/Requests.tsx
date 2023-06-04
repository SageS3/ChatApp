import { useState, useEffect } from "react"
import { getDoc, doc, updateDoc, arrayRemove } from "firebase/firestore"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"
import "../Friends/Requests.css"
import { AcceptIgnoreButtons } from "./reusable"
import {
  acceptRequestFromListedRequests,
  LimitedUserObj,
} from "./updateDocUtils"

const Requests = () => {
  const [requests, setRequests] = useState<LimitedUserObj[]>([])

  const queryRequests = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    const users: LimitedUserObj[] = []
    if (querySnapshot.exists()) {
      const pendingRequests = querySnapshot.data().friends.pendingRequests
      pendingRequests.forEach((userObj: LimitedUserObj) => {
        users.push(userObj)
      })
    } else {
      console.log("no requests")
    }
    setRequests(users)
  }

  const ListRequests = () => (
    <>
      {requests.map((user: LimitedUserObj) => (
        <div key={user.id} className="user-request-container">
          <div className="image-container">
            <img src={user.photoURL} alt="" />
          </div>
          {user.userName}
          <AcceptIgnoreButtons
            accept={acceptRequestFromListedRequests}
            ignore={ignoreRequest}
            userObj={user}
          />
        </div>
      ))}
    </>
  )

  const ignoreRequest = async (requester: LimitedUserObj) => {
    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)
    await updateDoc(currentUserRef, {
      "friends.pendingRequests": arrayRemove({
        userName: requester.userName,
        userPhoto: requester.photoURL,
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
    const updateRequests = requests.filter(
      (request: LimitedUserObj) => request.id != requester.id
    )
    setRequests(updateRequests)
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
