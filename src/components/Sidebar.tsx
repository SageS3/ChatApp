import React from 'react'
import './Sidebar.css'
import {IoMdAdd} from 'react-icons/io' 

type SidebarProps = { 
  userData: {[key: string]: any}
}

function Sidebar({userData}:SidebarProps) {
  return (
    <div className='sidebar-wrapper'> 
      <div className='image-container'> 
        <button><IoMdAdd/></button>
      </div> 
      <p>{userData.email}</p>
      <button>Chats</button>
      <button>Profile</button>
      <button>Settings</button>
    </div>
  )
}

export default Sidebar