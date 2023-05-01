import { useEffect, useState } from "react"
import { collection, query, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import "./Friends.css"

const Friends = () => {
  const [allFriends, setAllFriends] = useState<[]>([])

  // const queryFriends = () => {
  //   const q = query(
  //     collection(db, "users"),

  //   )
  //   const friendsArr: any = []
  //   const querySnapshot = await getDocs(q)
  //   querySnapshot.forEach((doc) => {
  //     friendsArr.push(doc.data())
  //   })
  //   setAllFriends(friendsArr)
  // }

  useEffect(() => {}, [])

  return (
    <div className="friends">
      <header className="friends__header">
        <ul>
          <li>Friends</li>
          <li>
            <button>All</button>
          </li>
          <li>
            <button>Add Friends</button>
          </li>
        </ul>
      </header>
      <main className="friends--list">friends list</main>
    </div>
  )
}

export default Friends
