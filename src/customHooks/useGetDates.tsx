import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"

function useGetDates({ openAlert }: { openAlert: boolean }): {
  dates: TableData[] | null
  errorDates: unknown
} {
  const { $Dates } = useContext(DataContext)
  const { token } = useContext(LoginContext)
  const [dates, setDates] = useState<TableData[] | null>(null)
  const [errorDates, setErrorDates] = useState<unknown>(null)

  useEffect(() => {
    const getDates = async () => {
      try {
        const { status, data } = await $Dates.get({ token })

        if (status) {
          setDates(
            data.map((dat: TableData) => ({
              id: dat.id,
              clientName: dat.clientName,
              clientPhone: dat.clientPhone,
              date: dat.date,
              scheduler: dat.scheduler,
              requestedService: dat.requestedService
            }))
          )
        } else {
          throw new Error(data)
        }
      } catch (error) {
        setErrorDates(error)
      }
    }

    getDates()
  }, [$Dates, token, openAlert])

  return { dates, errorDates }
}

export default useGetDates
