import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"
import { useNavigate } from "react-router-dom"

function useLogout() {
  const { setToken } = useContext(LoginContext)
  const navigate = useNavigate()

  const logout = () => {
    setToken("")
    localStorage.removeItem("s_p_a")
    navigate("/login")
  }

  return logout
}

export default useLogout
