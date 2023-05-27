import { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"
import "../Friends/Requests.css"

type User = {
  id: string
  userName: string
  userPhoto: string
}
const Requests = () => {
  const [requests, setRequests] = useState<User[]>([])

  const queryRequests = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const querySnapshot = await getDoc(ref)
    const users: User[] = []
    if (querySnapshot.exists()) {
      const pendingRequests = querySnapshot.data().friends.pendingRequests
      pendingRequests.forEach((userObj: User) => {
        users.push(userObj)
      })
    } else {
      console.log("no requests")
    }
    setRequests(users)
  }

  const ListRequests = () => (
    <>
      {requests.map((request: User) => (
        <div key={request.id} className="user-request-container">
          <div className="image-container">
            <img src={request.userPhoto} alt="" />
          </div>
          {request.userName}
          <button>Accept</button>
          <button>Ignore</button>
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
