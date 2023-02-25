import { addDoc, collection } from "firebase/firestore"
import { db } from "./firebase"
import { auth } from "../config/firebase"

// arguments: userName, userId,
export const addGroup = () => {
  // const userId = user?.uid
  console.log("add group function call")
  const user = auth.currentUser
  const date = Date()
  const docRef = collection(db, "chat")
  addDoc(docRef, { createdAt: date, createdBy: user?.displayName })
}
