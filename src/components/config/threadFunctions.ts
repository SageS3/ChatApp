import {
  addDoc,
  collection,
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import { auth } from "./firebase"

export const addGroup = async (setThreadObj: (a: Object) => void) => {
  const user = auth.currentUser
  const collectionRef = collection(db, "chat")
  await addDoc(collectionRef, {
    createdAt: serverTimestamp(),
    createdBy: user?.uid,
    groupName: "",
    members: [user?.uid],
    recentMessage: {
      messageText: null,
      readBy: { sentAt: serverTimestamp(), sentBy: "" },
    },
    type: 1,
  })
    .then((re) => {
      let docRef = doc(db, "chat", re.id)
      updateDoc(docRef, { id: re.id })
      addMessageDoc(re.id)
      setThreadObj(re)
    })
    .catch((error) => {
      console.log(error)
    })
}

const addMessageDoc = async (threadId: string) => {
  await setDoc(doc(db, "message", threadId), {})
}

export const addMessageSubCollection = async (
  docId: string,
  message: string
) => {
  const user = auth.currentUser
  const subCollectionRef = collection(db, "message", docId, "messages")
  await addDoc(subCollectionRef, {
    sentBy: user?.uid,
    sentAt: serverTimestamp(),
    message: message,
  }).catch((error) => {
    console.log(error)
  })
}

export const editGroupName = async (groupId: string, groupName: string) => {
  const docRef = doc(db, "chat", groupId)
  await updateDoc(docRef, { groupName: groupName }).catch((error) => {
    console.log(error)
  })
}

export const updateRecentMessage = async (
  message: string,
  groupId: string,
  userName: string | null | undefined
) => {
  const docRef = doc(db, "chat", groupId)
  await updateDoc(docRef, {
    recentMessage: {
      messageText: message,
      readBy: {
        sentAt: serverTimestamp(),
        sentBy: userName,
      },
    },
  }).catch((error) => {
    console.log(error)
  })
}
