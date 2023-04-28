import "./Sidebar.css"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { AiOutlineMessage } from "react-icons/ai"
import { VscAccount } from "react-icons/vsc"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineLogout } from "react-icons/md"
import { AiFillMessage } from "react-icons/ai"
import { MdAccountCircle } from "react-icons/md"
import { IoSettingsSharp } from "react-icons/io5"

type SidebarProps = {
  setDashboard: (profile: string) => void
  userPhoto: string
  dashboard: string
}

const Sidebar: React.FC<SidebarProps> = ({
  setDashboard,
  userPhoto,
  dashboard,
}: SidebarProps) => {
  let userDisplayName = auth.currentUser?.displayName

  const handleLogOut = (auth: any) => {
    signOut(auth)
    console.log("user is signed out")
  }

  return (
    <div className="sidebar-wrapper">
      <div className="image-container">
        <img src={userPhoto} alt="" />
      </div>
      {<h3>{userDisplayName}</h3>}
      <button onClick={() => setDashboard("chats")} className="chats">
        {dashboard === "chats" || dashboard === "chat" ? (
          <AiFillMessage size={"1.3em"} color={"rgb(77, 255, 148)"} />
        ) : (
          <AiOutlineMessage size={"1.3em"} color={"rgb(77, 255, 148)"} />
        )}
        chats
      </button>
      <button className="profile" onClick={() => setDashboard("profile")}>
        {dashboard === "profile" ? (
          <MdAccountCircle size={"1.3em"} color={"rgb(77, 255, 148)"} />
        ) : (
          <VscAccount size={"1.3em"} color={"rgb(77, 255, 148)"} />
        )}
        Profile
      </button>
      <button onClick={() => setDashboard("settings")}>
        {dashboard === "settings" ? (
          <IoSettingsSharp size={"1.3em"} color={"rgb(77, 255, 148)"} />
        ) : (
          <IoSettingsOutline size={"1.3em"} color={"rgb(77, 255, 148)"} />
        )}
        Settings
      </button>
      <button onClick={() => handleLogOut(auth)} id="btn--logout">
        <MdOutlineLogout size={"1.3em"} color={"rgb(77, 255, 148)"} />
        Logout
      </button>
    </div>
  )
}

export default Sidebar
