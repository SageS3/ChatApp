import { initializeApp } from "firebase/app"
import firebaseConfig from "./config"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebase = initializeApp(firebaseConfig)

export const auth = getAuth(firebase)
export const user = auth.currentUser
export const db = getFirestore(firebase)
export const storage = getStorage(firebase)
export default firebase
