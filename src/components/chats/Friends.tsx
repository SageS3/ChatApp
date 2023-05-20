import { ChangeEvent, useEffect, useState } from "react"
import {
  collection,
  query,
  getDocs,
  doc,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { auth } from "../config/firebase"
import "./Friends.css"
import { MdAdd } from "react-icons/md"

const Friends = () => {
  const [allFriends, setAllFriends] = useState<any>([])
  const [friendsDirectory, setFriendsDirectory] = useState<string>("all")
  const [searchFriendQuery, setSearchFriendQuery] = useState<string>("")
  const [searchFriendResults, setSearchFriendResults] = useState<any>([])
  const [users, setUsers] = useState<any>([])
  const user = auth.currentUser

  useEffect(() => {
    queryFriends(user)
    console.log(searchFriendResults)
  }, [])

  // const ListFriends = () => (
  //   <>
  //     {allFriends.map((friend: any) => (
  //       <div className="friend" key={allFriends.indexOf(friend)}>
  //         {friend.userName}
  //       </div>
  //     ))}
  //   </>
  // )

  // const querySearchFriends = () => {
  //   const q = query(
  //     collection(db, "users"),
  //     where("userName", "==", `${searchFriendQuery}`)
  //   )
  //   onSnapshot(q, (querySnapshot) => {
  //     const users: any = []
  //     querySnapshot.forEach((doc) => {
  //       users.push(doc.data().name)
  //     })
  //     setSearchFriendResults(users)
  //   })
  // }
  // const queryInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearchFriendQuery(event.target.value)
  //   querySearchFriends()
  // }

  // const ListSearchResults = () => (
  //   <div className="search-results-container">
  //     {searchFriendResults.map((user: any) => (
  //       <div key={searchFriendResults.indexOf(user)}>{user}</div>
  //     ))}
  //   </div>
  // )
  // const AddFriends = () => (
  //   <div className="add-friends-container">
  //     <input
  //       type="text"
  //       placeholder="find a friend"
  //       value={searchFriendQuery}
  //       onChange={(event) => queryInputChangeHandler(event)}
  //     />
  //     <ListUsers />
  //   </div>
  // )

  const queryFriends = async (user: any) => {
    const q = query(collection(db, "users"), where("id", "!=", `${user?.uid}`))
    const querySnapshot = await getDocs(q)
    const userList: any = []
    querySnapshot.forEach((user: any) => {
      userList.push(user.data())
    })
    setUsers(userList)
    console.log(users[0].userName)
  }

  const ListUsers = () => (
    <>
      {users.map((user: any) => (
        <div className="user-container">
          <div className="user-image-container">
            <img src={user.photoURL} alt="" />
          </div>
          <p>{user.userName}</p>
          <button>
            <MdAdd size="1.8rem" color={"rgb(77, 255, 148)"} />
          </button>
        </div>
      ))}
    </>
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
          <li>
            <button type="button" onClick={() => setFriendsDirectory("add")}>
              Requests
            </button>
          </li>
        </ul>
      </header>
      <main className="friends--list">
        {/* {friendsDirectory === "all" && <ListFriends />} */}
        {friendsDirectory === "add" && <ListUsers />}
      </main>
    </div>
  )
}

export default Friends
