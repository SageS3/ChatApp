import { useEffect, useState, useMemo } from "react"
import {
  getDoc,
  doc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore"
import { db, auth } from "../config/firebase"
import "./Friends.css"
import Requests from "./Requests"
import AddFriends from "./AddFriends"
import { UserID, FullUserObj } from "./updateDocUtils"
import { MappedUsers, LoadingUi } from "./reusable"

const Friends = () => {
  const [friendsDirectory, setFriendsDirectory] = useState<string>("friends")
  const [users, setUsers] = useState<FullUserObj[]>([])
  const [friends, setFriends] = useState<FullUserObj[]>([])
  const [requests, setRequests] = useState<FullUserObj[]>([])
  const [requestIDs, setRequestIDs] = useState<string[]>([])
  const [hasRequests, setHasRequests] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const queryUsers = async (user: any) => {
    try {
      const q = query(collection(db, "users"), where("id", "!=", `${user.uid}`))
      const snapShot = await getDocs(q)
      const userData = snapShot.docs.map((doc) => doc.data() as FullUserObj)
      return userData
    } catch (error) {
      setErrorMessage(error as string)
    }
  }

  const queryRequests = async (
    userID: string | undefined,
    users: FullUserObj[],
    filterRequests: (users: FullUserObj[], idArr: string[]) => FullUserObj[]
  ) => {
    const ref = doc(db, `users/${userID}`)
    try {
      const querySnapshot = await getDoc(ref)
      const pendingReqs = querySnapshot.data()?.friends.pendingRequests
      const pendingRequestsIds = pendingReqs.map(
        (userObj: UserID) => userObj.id
      )
      pendingRequestsIds.length > 0 && setHasRequests(true)
      setRequestIDs(pendingRequestsIds)
      const result = filterRequests(users, pendingRequestsIds)
      return result
    } catch (error) {
      setErrorMessage(error as string)
    }
  }

  const queryFriends = async (
    userID: string | undefined,
    users: FullUserObj[],
    filterFriends: (users: any, idArr: any) => FullUserObj[]
  ) => {
    try {
      const ref = doc(db, `users/${userID}`)
      const querySnapshot = await getDoc(ref)
      const friendsArr = querySnapshot.data()?.friends.friends
      const idArr = friendsArr.map((userObj: UserID) => userObj.id)
      const result = filterFriends(users, idArr)
      return result
    } catch (error) {
      setErrorMessage(error as string)
    }
  }

  const filterFriends = (users: FullUserObj[], friendIDs: string[]) => {
    const idSet = new Set(friendIDs)
    return users.filter((user: FullUserObj) => idSet.has(user.id))
  }

  const filterRequests = (users: FullUserObj[], requestIDs: string[]) => {
    const idSet = new Set(requestIDs)
    return users.filter((user: FullUserObj) => idSet.has(user.id))
  }

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        const currentUser = auth?.currentUser
        const userID = currentUser?.uid
        if (!currentUser) setErrorMessage("User not signed in.")

        const usersData = await queryUsers(currentUser)
        const friendsData = await queryFriends(
          userID,
          usersData as FullUserObj[],
          filterFriends
        )
        const requestData = await queryRequests(
          userID,
          usersData as FullUserObj[],
          filterRequests
        )

        setUsers(usersData as FullUserObj[])
        setFriends(friendsData as FullUserObj[])
        setRequests(requestData as any)
      } catch (error) {
        // Handle errors here
        setErrorMessage(error as string)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [])

  type ButtonProps = {
    selected: boolean
    id: string
    onClick: () => void
  }

  const Button = ({ selected, id, onClick }: ButtonProps) => (
    <button className={selected ? "selected" : ""} onClick={onClick}>
      {id}
    </button>
  )

  const memoizedNotificationIndicator = useMemo(
    () => <div className="request--indicator" />,
    []
  )

  const handleButtonClick = (directory: string) => {
    setFriendsDirectory(directory)
  }

  const renderUsers = () => {
    if (isLoading) {
      return <LoadingUi />
    } else if (!isLoading && friends.length === 0) {
      return <p>no friends</p>
    } else {
      return <MappedUsers userArr={friends} />
    }
  }

  return (
    <div className="friends">
      <header className="friends__header">
        <ul>
          <li>Friends</li>
          <li>
            <Button
              selected={friendsDirectory === "friends"}
              id="Friends"
              onClick={() => handleButtonClick("friends")}
            />
          </li>
          <li>
            <Button
              selected={friendsDirectory === "add"}
              id="Add Friends"
              onClick={() => handleButtonClick("add")}
            />
          </li>
          <li>
            <Button
              selected={friendsDirectory === "requests"}
              id="Requests"
              onClick={() => handleButtonClick("requests")}
            />
            {hasRequests && memoizedNotificationIndicator}
          </li>
        </ul>
      </header>
      <main className="friends--list">
        {errorMessage && <p>{errorMessage}</p>}
        {friendsDirectory === "friends" && renderUsers()}
        {friendsDirectory === "add" && <AddFriends users={users} />}
        {friendsDirectory === "requests" && (
          <Requests
            requestIDs={requestIDs}
            requests={requests}
            setRequestIDs={setRequestIDs}
            setRequests={setRequests}
            filterRequests={filterRequests}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </main>
    </div>
  )
}

export default Friends
