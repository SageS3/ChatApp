import React from 'react'
import Sidebar from './Sidebar' 
import './Dashboard.css'

function Dashboard() {
  return (
    <div className='user-dashboard'> 
      <nav>nav</nav>
      <Sidebar></Sidebar> 
      <main>main</main> 
      <div className='user-input'> 
        <input></input>
      </div>
    </div>
  )
}

export default Dashboard