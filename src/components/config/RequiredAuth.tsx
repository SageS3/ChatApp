import React, {useState, useEffect} from 'react'  
import {useNavigate} from 'react-router-dom';  
import {getAuth, onAuthStateChanged, updateProfile} from 'firebase/auth'

type RequiredAuthProps = { 
  children: React.ReactNode,
}

function RequiredAuth({children}:RequiredAuthProps) {   
  const [authenticated, setAuthenticated] = useState(false)
  const auth = getAuth()   
  const navigate = useNavigate()

  useEffect(() => {
    authCheck() 
    return () => authCheck() // componentWillUnmount
  }, [auth])
  
  const authCheck = () => { 
    onAuthStateChanged(auth, (user) => {
      if(user){
        updateProfile(user, {displayName: 'username' }).then(() => { 
          console.log('userName')
        }).catch((error) =>{ 
          console.log(error)
        })
        setAuthenticated(true) 
      } else {
        console.log('unauthorized')  
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
