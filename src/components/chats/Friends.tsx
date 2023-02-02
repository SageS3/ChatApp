import { useEffect, useState } from "react"
import { collection, query, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import "./Friends.css"

const Friends = () => {
  const [userQuery, setUserQuery] = useState<string>("")
  // const [userArr, setUserArr] = useState<string[]>([])

  const q = query(collection(db, "users"))

  const getUsers = async () => {
    const querySnapshot = await getDocs(q)
    const users = querySnapshot.docs.reduce((acc: any, doc) => {
      return [...acc, doc.data().userName]
    }, [])
    console.log(users)
  }

  // const queryUser = (usersArr: any) => {
  //   const filteredUsers = usersArr.filter((userName: string) => {
  //     userName.includes(userQuery)
  //   })
  //   console.log(filteredUsers)
  // }

  const handleInput = (event: any) => {
    setUserQuery(event.target.value)
  }
  // Search User
  // qeury search users using firestore method that returns an array
  // filter array on search feature

  useEffect(() => {
    ;(() => {
      getUsers()
    })()
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
