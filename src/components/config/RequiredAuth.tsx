import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import "./RequiredAuth.css"

type RequiredAuthProps = {
  children: React.ReactNode
}

function RequiredAuth({ children }: RequiredAuthProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    authCheck()
    return () => authCheck() //componentWillUnmount
  }, [auth])

  const authCheck = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true)
      } else {
        console.log("unauthorized")
        setAuthenticated(false)
        navigate("/")
      }
    })
  }

  // change to cauldron eventually
  const loading = () => (
    <div className="sign_in_loading">
      <h2>Loading...</h2>
    </div>
  )

  return <>{authenticated ? children : loading()}</>
}

export default RequiredAuth
