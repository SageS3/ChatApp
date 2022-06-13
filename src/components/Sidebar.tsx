import React from 'react'
import './Sidebar.css'
import {IoMdAdd} from 'react-icons/io'

function Sidebar() {
  return (
    <div className='sidebar-wrapper'> 
      <div className='image-container'> 
        <button><IoMdAdd/></button>
      </div>
      <button>Chats</button>
      <button>Profile</button>
      <button>Settings</button>
    </div>
  )
}

export default Sidebar