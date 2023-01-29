import "./Sidebar.css"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
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
      <button onClick={() => setDashboard("chats")}>Chats</button>
      <button onClick={() => setDashboard("profile")}>Profile</button>
      <button onClick={() => handleLogOut(auth)} id="btn--logout">
        Logout
      </button>
    </div>
  )
}

export default Sidebar
