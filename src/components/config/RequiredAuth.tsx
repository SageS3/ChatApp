import React from 'react'  
import {Navigate} from 'react-router-dom'; 

type RequiredAuthProps = { 
  children: React.ReactNode 
  isLoggedIn: boolean
}

function RequiredAuth({children, isLoggedIn}:RequiredAuthProps) { 

  if(!isLoggedIn) { 
    return( 
      <Navigate to='/' replace/>
    )
  } 

  return (  
    <> 
    {children}
    </>
  )
}

export default RequiredAuth