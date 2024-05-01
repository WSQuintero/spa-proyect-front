import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"

function useGetBills({ openAlert }: { openAlert: boolean }): {
  bills: TableData[] | null
  errorBills: unknown
} {
  const { $Bills } = useContext(DataContext)
  const { token } = useContext(LoginContext)
  const [bills, setBills] = useState<TableData[] | null>(null)
  const [errorBills, setErrorBills] = useState<unknown>(null)

  useEffect(() => {
    const getbills = async () => {
      try {
        const { status, data } = await $Bills.get({ token })

        if (status) {
          setBills(data)
        } else {
          throw new Error(data)
        }
      } catch (error) {
        setErrorBills(error)
      }
    }

    getbills()
  }, [$Bills, token, openAlert])

  return { bills, errorBills }
}

export default useGetBills
