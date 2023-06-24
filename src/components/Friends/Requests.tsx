import { useEffect } from "react"
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"
import "../Friends/Requests.css"
import { AcceptIgnoreButtons } from "./reusable"
import {
  FullUserObj,
  LimitedUserObj,
  updateCurrentUserDocs,
} from "./updateDocUtils"
import { MappedUsers } from "./reusable"

type RequestsProps = {
  requestIDs: string[]
  setRequestIDs: any
  queryRequests: () => void
  requests: FullUserObj[]
}

const Requests = ({
  requestIDs,
  requests,
  setRequestIDs,
  queryRequests,
}: RequestsProps) => {
  const ignoreRequest = async (requester: LimitedUserObj) => {
    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)
    await updateDoc(currentUserRef, {
      "friends.pendingRequests": arrayRemove({
        id: requester.id,
      }),
    })
    if (currentUser) {
      await updateDoc(requesterRef, {
        "friends.pendingSentRequests": arrayRemove({
          id: currentUser.uid,
        }),
      })
    }
    const updateRequests = requestIDs.filter(
      (request: string) => request !== requester.id
    )
    setRequestIDs(updateRequests)
  }

  const acceptRequestFromListedRequests = async (requester: LimitedUserObj) => {
    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)
    await updateDoc(currentUserRef, {
      "friends.friends": arrayUnion({
        id: requester.id,
      }),
      "friends.pendingRequests": arrayRemove({
        id: requester.id,
      }),
    })
    updateCurrentUserDocs(currentUser, requesterRef)
    const updateRequests = requestIDs.filter(
      (request: string) => request !== requester.id
    )
    setRequestIDs(updateRequests)
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
