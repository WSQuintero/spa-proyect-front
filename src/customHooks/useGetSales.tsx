import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"

function useGetSales(): { sales: TableData[] | null; errorSales: unknown } {
  const { $Sales } = useContext(DataContext)
  const { token } = useContext(LoginContext)
  const [sales, setSales] = useState<TableData[] | null>(null)
  const [errorSales, setErrorSales] = useState<unknown>(null)

  useEffect(() => {
    const getSales = async () => {
      try {
        const { status, data } = await $Sales.get({ token })

        if (status) {
          setSales(data)
          console.log(data)
        } else {
          throw new Error(data)
        }
      } catch (error) {
        setErrorSales(error)
      }
    }

    getSales()
  }, [$Sales, token])

  return { sales, errorSales }
}

export default useGetSales
