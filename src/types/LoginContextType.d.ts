import { LoginService } from "../services/loginService"

export interface LoginContextType {
  $Login: LoginService
  token: string
  setToken: (token: string) => void
  isValidated: () => Promise<boolean | undefined>
}
