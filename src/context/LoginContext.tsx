import { createContext, ReactNode, useState } from "react"
import { LoginService } from "../services/loginService"
import { LoginContextType } from "../types/LoginContextType"

export const LoginContext = createContext<LoginContextType>({
  $Login: new LoginService(),
  token: "",
  setToken: () => {}
})

export function LoginContextProvider({ children }: { children: ReactNode }) {
  const $Login = new LoginService()
  const [token, setToken] = useState("")

  return (
    <LoginContext.Provider value={{ $Login, token, setToken }}>
      {children}
    </LoginContext.Provider>
  )
}
