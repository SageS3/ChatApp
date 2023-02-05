import "./Sidebar.css"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { AiOutlineMessage } from "react-icons/ai"
import { VscAccount } from "react-icons/vsc"
import { IoMdSettings } from "react-icons/io"

type SidebarProps = {
  setDashboard: (profile: string) => void
  userPhoto: string
}

const Sidebar: React.FC<SidebarProps> = ({
  setDashboard,
  userPhoto,
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
      <button onClick={() => setDashboard("chats")}>
        <AiOutlineMessage size={"1.3em"} color={"rgb(255,6,200)"} />
        chats
      </button>
      <button onClick={() => setDashboard("profile")}>
        <VscAccount size={"1.3em"} color={"rgb(255,6,200)"} />
        Profile
      </button>
      <button onClick={() => setDashboard("settings")}>
        <IoMdSettings size={"1.3em"} color={"rgb(255,6,200)"} />
        Settings
      </button>
      <button onClick={() => handleLogOut(auth)} id="btn--logout">
        Logout
      </button>
    </div>
  )
}

export default Sidebar
