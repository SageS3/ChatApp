import React, {useState, useEffect} from 'react'  
import {useNavigate} from 'react-router-dom';  
import {getAuth, onAuthStateChanged} from 'firebase/auth'

type RequiredAuthProps = {
  children: React.ReactNode,
}   

function RequiredAuth({children}:RequiredAuthProps) {
  const [authenticated, setAuthenticated] = useState(false) 
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    authCheck()
    return () => authCheck() //componentWillUnmount
  }, [auth])

  const authCheck = () => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setAuthenticated(true) 
      } else {
        console.error('unauthorized')
        setAuthenticated(false)
        navigate('/')
      }
    });
  } 

  const loading = () => ( 
    <div className='animation-container'>
      <h2>Loading...</h2>
    </div>
  ) 

  return (
    <>
    {authenticated ? children : loading()}
    </>
  )
}

export default RequiredAuth


