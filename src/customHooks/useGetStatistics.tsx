import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"

function useGetStatistics(): {
  statistics: TableData[] | null
  errorStatistics: unknown
} {
  const { $Statistics } = useContext(DataContext)
  const { token } = useContext(LoginContext)
  const [statistics, setStatistics] = useState<TableData[] | null>(null)
  const [errorStatistics, setErrorStatistics] = useState<unknown>(null)

  useEffect(() => {
    const actualDate = new Date()
    const actualYear = actualDate.getFullYear()
    const actualMonth = (actualDate.getMonth() + 1).toString().padStart(2, "0")

    const getstatistics = async () => {
      try {
        const { status, data } = await $Statistics.get({
          token,
          year: actualYear.toString(),
          month: actualMonth
        })

        if (status) {
          setStatistics(data)
        } else {
          throw new Error(data)
        }
      } catch (error) {
        setErrorStatistics(error)
      }
    }

    getstatistics()
  }, [$Statistics, token])

  return { statistics, errorStatistics }
}

export default useGetStatistics
