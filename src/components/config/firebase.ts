import {initializeApp} from "firebase/app";  
import firebaseConfig from './config'
import {getAuth} from 'firebase/auth' 

const firebase = initializeApp(firebaseConfig);  

export const auth = getAuth(firebase) 
export default firebase 

