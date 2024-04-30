import { FormEvent } from "react"
import { LoginService } from "../services/loginService"

export const handleLogin = async (
  event: FormEvent<HTMLFormElement>,
  $login: LoginService,
  setToken: (token: string) => void,
  setError: (token: string) => void,
  navigate: (token: string) => void
): Promise<void> => {
  event.preventDefault()
  const target = event.target as HTMLFormElement
  const email = target.elements.namedItem("email") as HTMLInputElement
  const password = target.elements.namedItem("password") as HTMLInputElement

  try {
    const response = await $login.login({
      email: email.value,
      password: password.value
    })

    if (response.status) {
      setToken(response.data.token)
      navigate("/dashboard")
    } else {
      setError(response.data.message)
    }
  } catch (error) {
    console.error("Error occurred while logging in:", error)
  }
}
