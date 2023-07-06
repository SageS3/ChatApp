import { useState, useEffect } from "react"
import Sidebar from "../dashboard/Sidebar"
import {
  signOut,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth"
import { auth, db } from "../config/firebase"
import { updateDoc, collection, doc } from "firebase/firestore"
import Profile from "../profile/Profile"
import Chats from "../chats/Chats"
import Friends from "../Friends/Friends"
import Settings from "../settings/Settings"
import Thread from "../chats/Thread"
import "./Dashboard.css"

const navigateTo = {
  chats: "chats",
  chatWindow: "chat",
  profile: "profile",
  friends: "friends",
  settings: "settings",
}

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<string>(navigateTo.chats)
  const [userName, setUserName] = useState<string | null>("")
  const [userEmail, setUserEmail] = useState<any>("")
  const [userPhoto, setUserPhoto] = useState<any>("")
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [authorizing, setAuthorizing] = useState<boolean>(false)
  const [reauthEmail, setReauthEmail] = useState<string>("")
  const [reauthPassword, setReauthPassword] = useState<string>("")
  const [reauthError, setReauthError] = useState<string>("")
  const [threadObj, setThreadObj] = useState<Object | null>(null)

  const user = auth.currentUser
  const userDisplayName = user?.displayName //used for the navbar
  const collectionRef = collection(db, "users")

  useEffect(() => {
    if (user) {
      setUserName(user.displayName)
      setUserEmail(user.email)
      setUserPhoto(user.photoURL)
    }
  }, [user])

  const updateUsername = async (user: any) => {
    setIsUpdating(true)
    //updating Firestore userName...
    const docRef = doc(collectionRef, user.uid) // document id === user.uid
    await updateDoc(docRef, {
      userName: userName,
    })
    //updating Firebase auth displayName...
    await updateProfile(user, { displayName: userName }).then(() => {
      console.log("updated username")
    })
    setIsUpdating(false)
  }

  const credentials = EmailAuthProvider.credential(reauthEmail, reauthPassword)

  const reauthUser = async (event: any) => {
    event.preventDefault()
    if (user) {
      await reauthenticateWithCredential(user, credentials)
        .then(() => {
          console.log("user reauthenticated")
          setAuthorizing(false)
        })
        .catch((error) => {
          console.log(error.message)
          setReauthError("incorrect email or password")
        })
    }
    setReauthEmail("")
    setReauthPassword("")
  }

  const updateUserEmail = async (user: any) => {
    setIsUpdating(true)
    await updateEmail(user, userEmail)
      .then(() => {
        console.log("email updated")
      })
      .catch((error) => {
        console.log(error.message)
        error.message.includes("auth/requires-recent-login") &&
          setAuthorizing(true)
      })
    setIsUpdating(false)
  }

  const updateUserProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      user.displayName !== userName && updateUsername(user)
      user.email !== userEmail && updateUserEmail(user)
    }
  }

  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("user is signed out")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="user-dashboard">
      <nav>
        <p>{userDisplayName}</p>
        <button onClick={() => setDashboard(navigateTo.chats)}>Chats</button>
        <button onClick={() => setDashboard(navigateTo.profile)}>
          Profile
        </button>
        <button>Settings</button>
        <button className="logout-nav-button" onClick={handleLogOut}>
          Logout
        </button>
      </nav>
      {/* <img src={cauldron}/> */}
      <Sidebar
        dashboard={dashboard}
        setDashboard={setDashboard}
        userPhoto={userPhoto}
      ></Sidebar>
      <main>
        {dashboard === "profile" && (
          <Profile
            userName={userName}
            userEmail={userEmail}
            setUserName={setUserName}
            updateUser={updateUserProfile}
            setUserEmail={setUserEmail}
            isUpdating={isUpdating}
            userPhoto={userPhoto}
            setUserPhoto={setUserPhoto}
            authorizing={authorizing}
            reauthEmail={reauthEmail}
            reauthPassword={reauthPassword}
            reauthUser={reauthUser}
            setReauthEmail={setReauthEmail}
            setReauthPassword={setReauthPassword}
            setAuthorizing={setAuthorizing}
            reauthError={reauthError}
            setIsUpdating={setIsUpdating}
          />
        )}
        {dashboard === "chats" && (
          <Chats setDashboard={setDashboard} setThreadObj={setThreadObj} />
        )}
        {dashboard === "friends" && <Friends />}
        {dashboard === "settings" && <Settings />}
        {dashboard === "chat" && (
          <Thread threadObj={threadObj} userPhoto={userPhoto} />
        )}
      </main>
    </div>
  )
}

export default Dashboard
