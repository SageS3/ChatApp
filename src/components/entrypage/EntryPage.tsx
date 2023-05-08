import { useState } from "react"
import Register from "../entrypage/Register"
import Login from "./Login"
import "./EntryPage.css"
import { animated, useSpring } from "@react-spring/web"
import Cauldron from "../svg/Cauldron"

const EntryPage = () => {
  const [form, setForm] = useState<string>("register")

  const slider = useSpring({
    config: { duration: 200 },
    right: form === "login" ? "0px" : "100px",
    borderRadius: form === "login" ? "0 12px 12px 0" : "12px 0 0 12px",
  })

  const fontColorChange = useSpring({
    config: { duration: 200 },
    color: form === "login" ? "black" : "rgb(77, 255, 148)",
  })

  const registerFontColorChange = useSpring({
    config: { duration: 200 },
    color: form === "register" ? "black" : "rgb(77, 255, 148)",
  })

  return (
    <>
      <div className="toggle">
        <animated.span style={slider} className="slider"></animated.span>
        <animated.button
          type="button"
          onClick={() => setForm("register")}
          style={registerFontColorChange}
        >
          Sign Up
        </animated.button>
        <animated.button
          type="button"
          onClick={() => setForm("login")}
          style={fontColorChange}
        >
          Sign In
        </animated.button>
      </div>
      <Cauldron />
      {form === "register" && <Register setForm={setForm} />}
      {form === "login" && <Login />}
    </>
  )
}

export default EntryPage
