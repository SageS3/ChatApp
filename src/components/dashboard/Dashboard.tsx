import { useState, useEffect } from "react"
import Sidebar from "../dashboard/Sidebar"
import { AiFillMessage } from "react-icons/ai"
import { IoSettingsSharp } from "react-icons/io5"
import { MdOutlineLogout } from "react-icons/md"
import { FaUserFriends } from "react-icons/fa"
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

type ProfileForm = {
  userName: string | null
  userEmail: string | null
  userPhoto: string | null
}

type ReauthUserCredentials = {
  reauthError: string
  reauthEmail: string
  reauthPassword: string
}

const Dashboard = () => {
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    userName: "",
    userEmail: "",
    userPhoto: "",
  })
  const [reauthUserForm, setReauthUserForm] = useState<ReauthUserCredentials>({
    reauthError: "",
    reauthEmail: "",
    reauthPassword: "",
  })
  const [dashboard, setDashboard] = useState<string>(navigateTo.chats)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [authorizing, setAuthorizing] = useState<boolean>(false)
  const [reauthEmail, setReauthEmail] = useState<string>("")
  const [reauthPassword, setReauthPassword] = useState<string>("")
  const [threadObj, setThreadObj] = useState<Object | null>(null)

  const user = auth.currentUser
  const userDisplayName = user?.displayName //used for the navbar
  const collectionRef = collection(db, "users")

  useEffect(() => {
    if (user) {
      setProfileForm({
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
      })
    }
  }, [])

  const updateUsername = async (user: any) => {
    setIsUpdating(true)
    //updating Firestore userName...
    const docRef = doc(collectionRef, user.uid) // document id === user.uid
    await updateDoc(docRef, {
      userName: profileForm.userName,
    })
    //updating Firebase auth displayName...
    await updateProfile(user, { displayName: profileForm.userName }).then(
      () => {
        console.log("updated username")
      }
    )
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
          setReauthUserForm({
            ...reauthUserForm,
            reauthError: "incorrect email or password",
          })
        })
    }
    setReauthEmail("")
    setReauthPassword("")
  }

  const updateUserEmail = async (user: any, userEmail: string | null) => {
    setIsUpdating(true)
    if (userEmail != null) {
      await updateEmail(user, userEmail)
        .then(() => {
          console.log("email updated")
        })
        .catch((error) => {
          console.log(error.message)
          error.message.includes("auth/requires-recent-login") &&
            setAuthorizing(true)
        })
    }
    setIsUpdating(false)
  }

  const updateUserProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    user?.displayName !== profileForm.userName && updateUsername(user)
    user?.email !== profileForm.userEmail &&
      updateUserEmail(user, profileForm.userEmail)
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
      <nav className="navbar__tablet--display">
        <button onClick={() => setDashboard(navigateTo.friends)}>
          <FaUserFriends size={"2.2em"} color={"rgb(39 194 160)"} />
        </button>
        <button onClick={() => setDashboard(navigateTo.chats)}>
          <AiFillMessage size={"2.2em"} color={"rgb(39 194 160)"} />
        </button>
        <button onClick={() => setDashboard(navigateTo.profile)}>
          <img src={profileForm?.userPhoto || ""} />
        </button>
        <button onClick={() => setDashboard(navigateTo.settings)}>
          <IoSettingsSharp size={"2.2em"} color={"rgb(39 194 160)"} />
        </button>
        <button className="logout-nav-button" onClick={handleLogOut}>
          <MdOutlineLogout size={"2.2em"} color={"rgb(39 194 160)"} />
        </button>
      </nav>
      {/* <img src={cauldron}/> */}
      <Sidebar
        dashboard={dashboard}
        setDashboard={setDashboard}
        userPhoto={profileForm?.userPhoto || ""}
      ></Sidebar>
      <main>
        {dashboard === "profile" && (
          <Profile
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            updateUser={updateUserProfile}
            isUpdating={isUpdating}
            authorizing={authorizing}
            reauthUser={reauthUser}
            setAuthorizing={setAuthorizing}
            reauthUserForm={reauthUserForm}
            setReauthUserForm={setReauthUserForm}
            setIsUpdating={setIsUpdating}
          />
        )}
        {dashboard === "chats" && (
          <Chats setDashboard={setDashboard} setThreadObj={setThreadObj} />
        )}
        {dashboard === "friends" && <Friends />}
        {dashboard === "settings" && <Settings />}
        {dashboard === "chat" && (
          <Thread threadObj={threadObj} userPhoto={user?.photoURL} />
        )}
      </main>
    </div>
  )
}

export default Dashboard
