import { useNavigate } from "react-router-dom"
import { ReactNode, useContext, useEffect, useState } from "react"
import { LoginContext } from "../context/LoginContext"

interface PrivateRouteProps {
  element: ReactNode
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const { isValidated } = useContext(LoginContext)
  const navigate = useNavigate()
  const [validate, setValidate] = useState(false)

  useEffect(() => {
    const validate = async () => {
      const isValidate = await isValidated()
      if (!isValidate) {
        setValidate(false)
        navigate("/login")
        localStorage.removeItem("s_p_a")
        return
      }
      setValidate(true)
    }

    validate()
  }, [])

  return <>{validate && element}</>
}

export default PrivateRoute
