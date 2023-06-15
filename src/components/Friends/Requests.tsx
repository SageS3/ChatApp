import { useState, useEffect } from "react"
import {
  getDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"
import "../Friends/Requests.css"
import { AcceptIgnoreButtons } from "./reusable"
import { LimitedUserObj, updateCurrentUserDocs } from "./updateDocUtils"
import { MappedUsers } from "./reusable"
type RequestsProps = {
  setHasRequests: any
}
const Requests = ({ setHasRequests }: RequestsProps) => {
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
    setHasRequests(users.length > 0)
  }

  const ignoreRequest = async (requester: LimitedUserObj) => {
    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)
    await updateDoc(currentUserRef, {
      "friends.pendingRequests": arrayRemove({
        userName: requester.userName,
        photoURL: requester.photoURL,
        id: requester.id,
      }),
    })
    if (currentUser) {
      await updateDoc(requesterRef, {
        "friends.pendingSentRequests": arrayRemove({
          userName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          id: currentUser.uid,
        }),
      })
    }
    const updateRequests = requests.filter(
      (request: LimitedUserObj) => request.id != requester.id
    )
    setRequests(updateRequests)
  }

  const acceptRequestFromListedRequests = async (requester: LimitedUserObj) => {
    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)
    await updateDoc(currentUserRef, {
      "friends.friends": arrayUnion({
        userName: requester.userName,
        photoURL: requester.photoURL,
        id: requester.id,
      }),
      "friends.pendingRequests": arrayRemove({
        userName: requester.userName,
        photoURL: requester.photoURL,
        id: requester.id,
      }),
    })
    updateCurrentUserDocs(currentUser, requesterRef)
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
      <MappedUsers
        userArr={requests}
        AcceptIgnoreButtons={AcceptIgnoreButtons}
        accept={acceptRequestFromListedRequests}
        ignore={ignoreRequest}
      />
    </div>
  )
}

export default Requests
