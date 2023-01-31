import { useEffect, useState } from "react"
import { collection, query, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import "./Friends.css"

const Friends = () => {
  const [userQuery, setUserQuery] = useState<string>("")
  const q = query(collection(db, "users"))

  const getUsers = async (userQuery: string) => {
    const querySnapshot = await getDocs(q)
    const users = querySnapshot.docs
  }
  const handleInput = (event: any) => {
    setUserQuery(event.target.value)
    getUsers(userQuery)
  }
  // Search User
  // qeury search users using firesstore method that returns an array
  // filter array on search feature

  useEffect(() => {
    console.log("Friends mounted")
  }, [])
  return (
    <div className="friends-main">
      <section className="input-container">
        <input
          type="text"
          placeholder="Find friends..."
          value={userQuery}
          onChange={(e) => handleInput(e)}
        />
      </section>
    </div>
  )
}

export default Friends

// This function will do two main things:

// list user's friends alphabetically
// list will contain user's image and username
// you can select a user / user's to send a message to
// if multiple users are selected, user will have the option to
// send independently or as a group message.

// The secound functionality will be that a user can search for
// users and add them as a friend.

// Another functionality- there will be a cog next to a user in the
// list of users, which will allow a user to unfriend another user
