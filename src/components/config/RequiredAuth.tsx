import React, {useEffect} from 'react'  
import {useNavigate} from 'react-router-dom';  
import {getAuth, onAuthStateChanged} from 'firebase/auth'

type RequiredAuthProps = { 
  children: React.ReactNode,
  isLoggedIn: boolean, 
  setUserData: (a:Object) => void
}

function RequiredAuth({children, setUserData}:RequiredAuthProps) {  
  const auth = getAuth()   
  const navigate = useNavigate()

  useEffect(() => {
    authCheck() 
    return () => authCheck() // componentWillUnmount
  }, [auth])

  const authCheck = () => { 
    onAuthStateChanged(auth, (user) => {
      if(user){  
        setUserData(user)
      } else {
        console.log('unauthorized') 
        navigate('/') 
      } 
    });
  }  
  return (  
    <> 
    {children}
    </>
  )
}

export default RequiredAuth 
