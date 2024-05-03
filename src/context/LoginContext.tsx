import { createContext, ReactNode, useEffect, useMemo, useState } from "react"
import { LoginService } from "../services/loginService"
import { LoginContextType } from "../types/LoginContextType"

export const LoginContext = createContext<LoginContextType>({
  $Login: new LoginService(),
  token: "",
  setToken: () => {},
  isValidated: async () => false
})

export function LoginContextProvider({ children }: { children: ReactNode }) {
  const $Login = useMemo(() => new LoginService(), [])
  const [token, setToken] = useState("")
  const isValidated = useMemo(() => {
    return async () => {
      const tnString = localStorage.getItem("s_p_a")
      const tn = JSON.parse(String(tnString))?.tn || "invalid"
      console.log(tn)

      try {
        const { status } = await $Login.validateLogin({
          token: tn
        })

        if (status) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error("Error occurred while validating session:", error)
        return false
      }
    }
  }, [$Login])

  useEffect(() => {
    const tnString = localStorage.getItem("s_p_a")
    if (tnString) {
      setToken(JSON.parse(String(tnString)).tn)
    }
  }, [])

  return (
    <LoginContext.Provider value={{ $Login, token, setToken, isValidated }}>
      {children}
    </LoginContext.Provider>
  )
}
