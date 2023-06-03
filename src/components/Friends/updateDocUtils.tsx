import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"

export type LimitedUserObj = {
  id: string
  userName: string
  userPhoto: string
}

export type FullUserObj = {
  friends: {}
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
      userName: requestedUser.userName,
      userPhoto: requestedUser.photoURL,
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
      userName: currentUser.displayName,
      userPhoto: currentUser.photoURL,
      id: currentUser.uid,
    }),
  })
}

export const acceptRequestFromListedRequests = async (
  requester: LimitedUserObj
) => {
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
  updateCurrentUserDocs(currentUser, requesterRef)
}

export const acceptRequestFromListedUsers = async (requester: FullUserObj) => {
  const currentUser = auth?.currentUser
  const currentUserID = currentUser?.uid
  const currentUserRef = doc(db, `users/${currentUserID}`)
  const requesterRef = doc(db, `users/${requester.id}`)

  await updateDoc(currentUserRef, {
    "friends.friends": arrayUnion({
      userName: requester.userName,
      userPhoto: requester.photoURL,
      id: requester.id,
    }),
    "friends.pendingRequests": arrayRemove({
      userName: requester.userName,
      userPhoto: requester.photoURL,
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
        userName: requesterObj.userName,
        userPhoto: requesterObj.photoURL,
        id: requesterObj.id,
      }),
    })
    await updateDoc(requesterRef, {
      "friends.pendingSentRequests": arrayRemove({
        userName: currentUser.displayName,
        userPhoto: currentUser.photoURL,
        id: currentUser.uid,
      }),
    })
  }
}

const updateCurrentUserDocs = async (currentUser: any, requesterRef: any) => {
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
