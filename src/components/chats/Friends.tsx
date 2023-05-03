import { useEffect, useState } from "react"
import { collection, query, getDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"
import "./Friends.css"

const Friends = () => {
  const [allFriends, setAllFriends] = useState<any>([])
  const [friendsDirectory, setFriendsDirectory] = useState<string>("all")
  const user = auth.currentUser
  const queryFriends = async () => {
    const docRef = doc(db, "users", `${user?.uid}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setAllFriends(docSnap.data().friends)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  useEffect(() => {
    queryFriends()
  }, [])

  const ListFriends = () => (
    <>
      {allFriends.map((friend: any) => (
        <div className="friend" key={allFriends.indexOf(friend)}>
          {friend.userName}
        </div>
      ))}
    </>
  )

  const AddFriends = () => (
    <div className="add-friends-container">
      <input placeholder="find a friend" />
      <div className="search-results-container"></div>
    </div>
  )

  return (
    <div className="friends">
      <header className="friends__header">
        <ul>
          <li>Friends</li>
          <li>
            <button type="button" onClick={() => setFriendsDirectory("all")}>
              All
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setFriendsDirectory("add")}>
              Add Friends
            </button>
          </li>
        </ul>
      </header>
      <main className="friends--list">
        {friendsDirectory === "all" && allFriends.length > 0 && <ListFriends />}
        {friendsDirectory === "add" && <AddFriends />}
      </main>
    </div>
  )
}

export default Friends
