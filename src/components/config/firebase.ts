import {initializeApp} from "firebase/app";  
import firebaseConfig from './config'
import {getAuth} from 'firebase/auth'  
import {getFirestore} from 'firebase/firestore'

const firebase = initializeApp(firebaseConfig);  

export const auth = getAuth(firebase) 
export const db = getFirestore()
export default firebase 

