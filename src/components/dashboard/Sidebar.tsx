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

  const setDashboardHandler = (directory: string) => {
    setDashboard(directory)
  }

  return (
    <div className="sidebar-wrapper">
      <div className="image-container">
        <img src={userPhoto} alt="" />
      </div>
      {<h3>{userDisplayName}</h3>}
      <button onClick={() => setDashboardHandler("chats")} className="chats">
        {dashboard === "chats" ? (
          <AiFillMessage size={"1.3em"} color={"rgb(255,6,200)"} />
        ) : (
          <AiOutlineMessage size={"1.3em"} color={"rgb(255,6,200)"} />
        )}
        chats
      </button>
      <button
        className="profile"
        onClick={() => setDashboardHandler("profile")}
      >
        {dashboard === "profile" ? (
          <MdAccountCircle size={"1.3em"} color={"rgb(255,6,200)"} />
        ) : (
          <VscAccount size={"1.3em"} color={"rgb(255,6,200)"} />
        )}
        Profile
      </button>
      <button onClick={() => setDashboard("settings")}>
        {dashboard === "settings" ? (
          <IoSettingsSharp size={"1.3em"} color={"rgb(255,6,200)"} />
        ) : (
          <IoSettingsOutline size={"1.3em"} color={"rgb(255,6,200)"} />
        )}
        Settings
      </button>
      <button onClick={() => handleLogOut(auth)} id="btn--logout">
        <MdOutlineLogout size={"1.3em"} color={"rgb(255,6,200)"} />
        Logout
      </button>
    </div>
  )
}

export default Sidebar
