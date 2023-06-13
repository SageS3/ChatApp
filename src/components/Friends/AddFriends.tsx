import { useState, useEffect, useRef } from "react"
import { auth } from "../config/firebase"
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { MdAdd } from "react-icons/md"
import {
  updateUserSentRequests,
  updateThirdPartyPendingRequests,
  acceptRequestFromListedUsers,
  LimitedUserObj,
  FullUserObj,
  ignoreRequestFromListedUsers,
} from "./updateDocUtils"
import { AcceptIgnoreButtons } from "./reusable"
import { MappedUsers } from "./reusable"

const AddFriends = () => {
  const [pendingSentRequestsIDs, setPendingSentRequestsIDs] = useState<
    string[]
  >([])
  const [pendingRequestsIDs, setPendingRequestsIDs] = useState<string[]>([])
  const [friendsIDs, setFriendsIDs] = useState<string[]>([])
  const [users, setUsers] = useState<FullUserObj[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const searchRef = useRef<HTMLInputElement>(null)
  const user = auth?.currentUser

  const sendFriendRequestHandler = async (requestedUser: any) => {
    const currentUser = auth?.currentUser
    await updateUserSentRequests(requestedUser, currentUser)
    await updateThirdPartyPendingRequests(requestedUser, currentUser)
    await getUserIDs()
  }
  const queryUsers = async (user: any) => {
    const q = query(collection(db, "users"), where("id", "!=", `${user?.uid}`))
    const querySnapshot = await getDocs(q)
    const userList: any = []
    querySnapshot.forEach((user: any) => {
      userList.push(user.data())
    })
    setUsers(userList)
    console.log(users)
  }

  const getUserIDs = async () => {
    const currentUser = auth.currentUser
    const userID = currentUser?.uid
    const ref = doc(db, `users/${userID}`)
    const docs = await getDoc(ref)

    if (docs.exists()) {
      const pendingSentRequestsArr = docs.data().friends.pendingSentRequests
      const pendingRequestsArr = docs.data().friends.pendingRequests
      const friendsArr = docs.data().friends.friends
      if (pendingRequestsArr) {
        const pendingRequestsIdArr = pendingRequestsArr.map(
          (user: LimitedUserObj) => {
            return user.id
          }
        )
        setPendingRequestsIDs(pendingRequestsIdArr)
      }
      if (pendingSentRequestsArr) {
        const pendingSentRequestsIdArr = pendingSentRequestsArr.map(
          (user: LimitedUserObj) => {
            return user.id
          }
        )
        setPendingSentRequestsIDs(pendingSentRequestsIdArr)
      }
      if (friendsArr) {
        const friendsIdArr = friendsArr.map((user: LimitedUserObj) => {
          return user.id
        })
        setFriendsIDs(friendsIdArr)
      }
    } else {
      console.log("doc not found")
    }
  }

  // const filterUserArr = (usersArr: FullUserObj[], searchString: string) => {
  //   const filtered = usersArr.filter((user: FullUserObj) => {
  //     user.userName.toLowerCase().includes(searchString.toLowerCase())
  //   })
  //   setUsers(filtered)
  // }
  const handleInputChange = (
    event: any,
    userArr: FullUserObj[],
    searchString: string
    // filterUserArr: any
  ) => {
    setSearchQuery(event.target.value)
    // filterUserArr(userArr, searchString)
  }

  type ButtonStateProps = {
    userID: string
    userObj: FullUserObj
  }

  const ButtonState = ({ userID, userObj }: ButtonStateProps): JSX.Element => {
    return (
      <>
        {pendingSentRequestsIDs.includes(userID) && (
          <div className="pending-text">Pending...</div>
        )}
        {friendsIDs.includes(userID) && (
          <div className="button-state__friends">Friends</div>
        )}
        {pendingRequestsIDs.includes(userID) && (
          <AcceptIgnoreButtons
            accept={() => acceptRequestFromListedUsers(userObj)}
            ignore={() => ignoreRequestFromListedUsers(userObj)}
            userObj={userObj}
          />
        )}
        {!pendingRequestsIDs.includes(userID) &&
          !pendingSentRequestsIDs.includes(userID) &&
          !friendsIDs.includes(userID) && (
            <button
              onClick={() => sendFriendRequestHandler(userObj)}
              className="add-friend__button"
            >
              <MdAdd size="1.8rem" color={"rgb(77, 255, 148)"} />
            </button>
          )}
      </>
    )
  }

  useEffect(() => {
    getUserIDs()
    queryUsers(user)
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])
  return (
    <>
      <input
        ref={searchRef}
        type="text"
        className="input__search-bar"
        placeholder="Search Users"
        value={searchQuery}
        onChange={(event) => handleInputChange(event, users, searchQuery)}
      />
      {searchQuery.length > 0 && (
        <MappedUsers userArr={users} ButtonState={ButtonState} />
      )}
    </>
  )
}

export default AddFriends
