import { Navigate } from "react-router-dom"
import useValidateToken from "../customHooks/useValidateToken"
import { ReactNode } from "react"

interface PrivateRouteProps {
  element: ReactNode
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const validate = useValidateToken()

  return validate ? element : <Navigate to="/login" replace />
}

export default PrivateRoute
