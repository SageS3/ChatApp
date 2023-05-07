import { ChangeEvent, useEffect, useState } from "react"
import {
  collection,
  query,
  getDoc,
  doc,
  onSnapshot,
  where,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"
import "./Friends.css"

const Friends = () => {
  const [allFriends, setAllFriends] = useState<any>([])
  const [friendsDirectory, setFriendsDirectory] = useState<string>("all")
  const [searchFriendQuery, setSearchFriendQuery] = useState<string>("")
  const [searchFriendResults, setSearchFriendResults] = useState<any>([])
  const user = auth.currentUser
  // const queryFriends = async () => {
  //   const docRef = doc(db, "users", `${user?.uid}`)
  //   const docSnap = await getDoc(docRef)
  //   if (docSnap.exists()) {
  //     setAllFriends(docSnap.data().friends)
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!")
  //   }
  // }

  useEffect(() => {
    // queryFriends()
    console.log(searchFriendResults)
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

  const querySearchFriends = () => {
    const q = query(
      collection(db, "users"),
      where("userName", "==", `${searchFriendQuery}`)
    )
    onSnapshot(q, (querySnapshot) => {
      const users: any = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data().name)
      })
      setSearchFriendResults(users)
    })
  }

  const ListSearchResults = () => (
    <div className="search-results-container">
      {/* {searchFriendResults.map((user: any) => (
        <div>{"chatbot"}</div>
      ))} */}
      <p>user</p>
    </div>
  )
  const queryInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFriendQuery(event.target.value)
    querySearchFriends()
  }
  const addFriends = () => (
    <div className="add-friends-container">
      <input
        type="text"
        placeholder="find a friend"
        value={searchFriendQuery}
        onChange={(event) => queryInputChangeHandler(event)}
      />
      <ListSearchResults />
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
        {friendsDirectory === "add" && addFriends()}
      </main>
    </div>
  )
}

export default Friends
