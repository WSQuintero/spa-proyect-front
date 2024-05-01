export class DatesService {
  async get({ token }: { token: string }) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "GET"
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/dates`,
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

  async create({ token, body }: { token: string; body: TableData }) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify(body)
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/dates`,
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
