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
  filterRequests: (users: FullUserObj[], idArr: string[]) => FullUserObj[]
  requestIDs: string[]
  setRequestIDs: any
  requests: FullUserObj[]
  setRequests: any
  setIsLoading: any
  isLoading: any
}

const Requests = ({
  requestIDs,
  requests,
  setRequests,
  setRequestIDs,
  filterRequests,
  setIsLoading,
  isLoading,
}: RequestsProps) => {
  const ignoreRequest = async (requester: LimitedUserObj) => {
    // updates Firestore:
    // removes requester from pendingRequests.
    // removes requester's pendingSentRequests data.

    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)
    try {
      setIsLoading(true)
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

      const updateRequestIds = requestIDs.filter(
        (request: string) => request !== requester.id
      )
      setRequestIDs(updateRequestIds)
      const result = filterRequests(requests, updateRequestIds)
      setRequests(result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const acceptRequestFromListedRequests = async (requester: LimitedUserObj) => {
    // updates Firestore:
    // adds requester as friends.
    // removes requester from requests array.

    const currentUser = auth?.currentUser
    const currentUserID = currentUser?.uid
    const currentUserRef = doc(db, `users/${currentUserID}`)
    const requesterRef = doc(db, `users/${requester.id}`)

    try {
      setIsLoading(true)
      await updateDoc(currentUserRef, {
        "friends.friends": arrayUnion({
          id: requester.id,
        }),
        "friends.pendingRequests": arrayRemove({
          id: requester.id,
        }),
      })

      updateCurrentUserDocs(currentUser, requesterRef)

      const updateRequestIds = requestIDs.filter(
        (request: string) => request !== requester.id
      )
      setRequestIDs(updateRequestIds)
      const result = filterRequests(requests, updateRequestIds)
      setRequests(result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="main__requests">
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <MappedUsers
          userArr={requests}
          AcceptIgnoreButtons={AcceptIgnoreButtons}
          accept={acceptRequestFromListedRequests}
          ignore={ignoreRequest}
        />
      )}
    </div>
  )
}

export default Requests
