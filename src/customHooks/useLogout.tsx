import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"

function useLogout() {
  const { setToken } = useContext(LoginContext)

  const logout = () => {
    setToken("")
    localStorage.removeItem("s_p_a")
    window.location.reload()
  }

  return logout
}

export default useLogout
