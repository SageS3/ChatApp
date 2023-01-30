import { useEffect } from "react"
import "./Friends.css"

const Friends = () => {
  // Search User
  // qeury search users using firesstore method that returns an array
  // filter array on search feature

  // const users = [
  //   {
  //     userName: "AliceIsGod",
  //   },

  //   { userName: "BellaTheBig" },
  // ]

  // const queryUsers = setTimeout(() => {
  //   users.filter(() => {

  //   })
  // }, 1000)

  useEffect(() => {
    console.log("Friends mounted")
  }, [])
  return (
    <div className="friends-main">
      <section className="input-container">
        <input placeholder="Search friends..." />
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
