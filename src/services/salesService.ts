import { ServicesType } from "../types/ServicesType"

export class SalesService {
  async get({ token }: ServicesType) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "GET"
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/sales`,
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
  async create({ token, body }: ServicesType) {
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
        `${import.meta.env.VITE_APP_URL}/sales`,
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

  async update({ token, body, id }: ServicesType) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "PATCH",
        body: JSON.stringify(body)
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/sales/${id}`,
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
  async delete({ token, id }: ServicesType) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        method: "DELETE"
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/sales/${id}`,
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
