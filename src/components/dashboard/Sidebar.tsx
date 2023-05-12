import "./Sidebar.css"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { AiOutlineMessage } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineLogout } from "react-icons/md"
import { AiFillMessage } from "react-icons/ai"
import { FaUserFriends } from "react-icons/fa"
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
      <div className="image-container" onClick={() => setDashboard("profile")}>
        <img src={userPhoto} alt="" />
      </div>
      <button onClick={() => setDashboard("chats")} className="chats">
        {dashboard === "chats" || dashboard === "chat" ? (
          <AiFillMessage size={"1.5em"} color={"rgb(77, 255, 148)"} />
        ) : (
          <AiOutlineMessage size={"1.5em"} color={"rgb(77, 255, 148)"} />
        )}
      </button>
      <button className="profile" onClick={() => setDashboard("friends")}>
        {dashboard === "friends" ? (
          <FaUserFriends size={"1.5em"} color={"rgb(77, 255, 148)"} />
        ) : (
          <FiUsers size={"1.3em"} color={"rgb(77, 255, 148)"} />
        )}
      </button>
      <button onClick={() => setDashboard("settings")}>
        {dashboard === "settings" ? (
          <IoSettingsSharp size={"1.5em"} color={"rgb(77, 255, 148)"} />
        ) : (
          <IoSettingsOutline size={"1.5em"} color={"rgb(77, 255, 148)"} />
        )}
      </button>
      <button onClick={() => handleLogOut(auth)} id="btn--logout">
        <MdOutlineLogout size={"1.5em"} color={"rgb(77, 255, 148)"} />
      </button>
    </div>
  )
}

export default Sidebar
