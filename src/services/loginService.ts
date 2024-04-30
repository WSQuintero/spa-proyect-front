export class LoginService {
  async login({ email, password }: { email: string; password: string }) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email, password })
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/login`,
        options
      )
      const data = await response.json()
      const statusData = response.ok

      if (!statusData) {
        throw new Error(data.error)
      }

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async validateLogin({ token }: { token: string }) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "GET"
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/login/validation`,
        options
      )
      const data = await response.json()
      const statusData = response.ok

      if (!statusData) {
        throw new Error(data.error)
      }

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error }
    }
  }
}
