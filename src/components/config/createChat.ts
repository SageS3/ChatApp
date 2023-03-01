import { addDoc, collection, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase"
import { auth } from "../config/firebase"

// arguments: userName, userId,
export const addGroup = async () => {
  // const userId = user?.uid
  console.log("add group function call")
  const user = auth.currentUser
  const date = Date()
  const collectionRef = collection(db, "chat")
  await addDoc(collectionRef, {
    createdAt: date,
    createdBy: user?.displayName,
    groupName: "",
  }).then((re) => {
    let docRef = doc(db, "chat", re.id)
    updateDoc(docRef, { id: re.id })
  })
}
