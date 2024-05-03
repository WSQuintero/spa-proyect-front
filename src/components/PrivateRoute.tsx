import { Navigate, useNavigate } from "react-router-dom"
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
        console.log(isValidate)
        // Redirect to the login page if the user is not authenticated
        navigate("/login")
        return
      }
      setValidate(true)
    }

    validate()
  }, [])

  // Return the provided element if the user is authenticated
  return <>{validate && element}</>
}

export default PrivateRoute
