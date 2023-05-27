import { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"
import "../Friends/Requests.css"
const Requests = () => {
  const [requests, setRequests] = useState([])

  const queryRequests = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    const users: any = []
    if (querySnapshot.exists()) {
      const pendingRequests = querySnapshot.data().friends.pendingRequests
      pendingRequests.forEach((userObj: {}) => {
        users.push(userObj)
      })
    } else {
      console.log("no requests")
    }
    setRequests(users)
  }

  const ListRequests = () => (
    <>
      {requests.map((request: any) => (
        <div key={request.id} className="user-request-container">
          <div className="image-container">
            <img src={request.userPhoto} alt="" />
          </div>
          {request.userName}
        </div>
      ))}
    </>
  )

  useEffect(() => {
    queryRequests()
  }, [])
  return (
    <div className="main__requests">
      <ListRequests />
    </div>
  )
}

export default Requests
