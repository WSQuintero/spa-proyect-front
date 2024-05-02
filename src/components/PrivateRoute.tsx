import { useNavigate } from "react-router-dom"
import useValidateToken from "../customHooks/useValidateToken"
import { ReactNode, useEffect, useState } from "react"

interface PrivateRouteProps {
  element: ReactNode
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const [isValidated, setIsValidated] = useState<boolean>(false)
  const validate = useValidateToken()
  const navigate = useNavigate()

  useEffect(() => {
    setIsValidated(validate)
  }, [validate])

  useEffect(() => {
    if (!isValidated) {
      const timeoutId = setTimeout(() => {
        navigate("/login")
      }, 300)

      return () => clearTimeout(timeoutId)
    }
  }, [isValidated, navigate])

  return isValidated ? element : null
}

export default PrivateRoute
