import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"

export type LimitedUserObj = {
  id: string
}
type FriendsObj = {
  friends: string[]
  pendingRequests: string[]
  pendingSentRequests: string[]
}
export type FullUserObj = {
  friends: FriendsObj
  id: string
  photoURL: string
  userName: string
}

export const updateUserSentRequests = async (
  requestedUser: any,
  currentUser: any
) => {
  const userID = currentUser?.uid
  const ref = doc(db, "users", userID)
  await updateDoc(ref, {
    "friends.pendingSentRequests": arrayUnion({
      id: requestedUser.id,
    }),
  })
}

export const updateThirdPartyPendingRequests = async (
  requestedUser: any,
  currentUser: any
) => {
  const thirdParyUserID = requestedUser.id
  const ref = doc(db, "users", thirdParyUserID)
  await updateDoc(ref, {
    "friends.pendingRequests": arrayUnion({
      id: currentUser.uid,
    }),
  })
}

export const acceptRequestFromListedUsers = async (requester: FullUserObj) => {
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
}

export const ignoreRequestFromListedUsers = async (
  requesterObj: FullUserObj
) => {
  const currentUser = auth?.currentUser
  const currentUserID = currentUser?.uid
  const requesterRef = doc(db, `users/${requesterObj.id}`)
  const currentUserRef = doc(db, `users/${currentUserID}`)
  if (currentUser) {
    await updateDoc(currentUserRef, {
      "friends.pendingRequests": arrayRemove({
        id: requesterObj.id,
      }),
    })
    await updateDoc(requesterRef, {
      "friends.pendingSentRequests": arrayRemove({
        id: currentUser.uid,
      }),
    })
  }
}

export const updateCurrentUserDocs = async (
  currentUser: any,
  requesterRef: any
) => {
  if (currentUser) {
    await updateDoc(requesterRef, {
      "friends.friends": arrayUnion({
        id: currentUser.uid,
      }),
      "friends.pendingSentRequests": arrayRemove({
        id: currentUser.uid,
      }),
    })
  }
}

export const populateRequests = (
  users: FullUserObj[],
  requestIDs: string[]
) => {
  const idSet = new Set(requestIDs)
  return users.filter((user: FullUserObj) => idSet.has(user.id))
}

export const populateFriends = (users: FullUserObj[], friendIDs: string[]) => {
  const idSet = new Set(friendIDs)
  return users.filter((user: FullUserObj) => idSet.has(user.id))
}
