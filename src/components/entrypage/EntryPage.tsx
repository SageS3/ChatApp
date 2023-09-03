import { useState } from "react"
import Register from "../entrypage/Register"
import Login from "./Login"
import "./EntryPage.css"
import { animated, useSpring } from "@react-spring/web"
import AstrisLogo from "../svg/AstrisLogo"

const EntryPage = () => {
  const [form, setForm] = useState<string>("register")

  const slider = useSpring({
    config: { duration: 200 },
    right: form === "login" ? "0px" : "100px",
    borderRadius: form === "login" ? "0 12px 12px 0" : "12px 0 0 12px",
  })

  const fontColorChange = useSpring({
    config: { duration: 200 },
    color: form === "login" ? "black" : "rgb(39,194,160)",
  })

  const registerFontColorChange = useSpring({
    config: { duration: 200 },
    color: form === "register" ? "black" : "rgb(39,194,160)",
  })

  const ToggleSwitch = () => (
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
  )

  return (
    <>
      <AstrisLogo />
      <ToggleSwitch />
      {form === "register" ? <Register setForm={setForm} /> : <Login />}
    </>
  )
}

export default EntryPage
