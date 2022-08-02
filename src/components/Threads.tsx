import React from 'react'
import './Threads.css'

const Threads = () => { 
  const threads = [
     {user:'Programmer', message: 'Hello World'}, 
     {user:'Alice', message: 'woof woof woof, woof. WOOF! woof woof- woof.'}, 
     {user:'Google', message: 'Congrats! you are hired'}, 
     {user:'Google', message: 'Congrats! you are hired'}, 
    //  {user: 'Google', message: 'Congrats! you are hired'},
    //  {user: 'Google', message: 'Congrats! you are hired'},
    //  {user: 'Google', message: 'Congrats! you are hired'},
    //  {user: 'Google', message: 'Congrats! you are hired'}
  ]  

  const chats = threads.map((chat, i) => { 
    return( 
      <div key={i} className='chat-container'> 
        <div className='edit-chat-button'> 
          <span/> 
          <span/>
          <span/>
        </div>
        <h3>{chat.user}</h3> 
        <p>{chat.message}</p>
      </div>
    )
  })

  return (
    <div className='threads-wrapper'>  
      <div className='chats-container'> 
        {chats}
      </div>
      <div className='input-wrapper'> 
        <input></input>
      </div>
    </div>
  )
} 

export default Threads
