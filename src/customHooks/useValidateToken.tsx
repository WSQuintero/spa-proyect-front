import { useContext, useEffect, useState } from "react"
import { LoginContext } from "../context/LoginContext"
import { useNavigate } from "react-router"

function useValidateToken() {
  const { $Login, token, setToken } = useContext(LoginContext)
  const navigate = useNavigate()
  const [validate, setValidate] = useState(false)

  useEffect(() => {
    const tnString = localStorage.getItem("s_p_a")
    if (tnString) {
      const tn = JSON.parse(tnString)
      const validateSession = async () => {
        try {
          const { status } = await $Login.validateLogin({
            token: tn.tn
          })

          if (status) {
            setToken(tn.tn)
            setValidate(true)
          } else {
            setToken("")
            navigate("/login")
            localStorage.removeItem("s_p_a")
            setValidate(false)
          }
        } catch (error) {
          console.error("Error occurred while validating session:", error)
        }
      }
      validateSession()
    }
  }, [navigate, $Login, setToken])

  useEffect(() => {
    if (token) {
      localStorage.setItem("s_p_a", JSON.stringify({ tn: token }))
      navigate("/dashboard")
    }
  }, [token])
  return validate
}

export default useValidateToken
