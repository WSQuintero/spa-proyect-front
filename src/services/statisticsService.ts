import { ServicesType } from "../types/ServicesType"

export class StatisticsService {
  async get({ token, year, month }: ServicesType) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "GET"
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/statistics/${year}/${month}`,
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
