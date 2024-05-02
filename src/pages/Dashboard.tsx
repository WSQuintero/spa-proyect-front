import { useContext, useEffect, useState } from "react"
import WraperContainer from "../components/WraperContainer"
import ModalFilterStatistics from "../components/ModalFilterStatistics"
import useGetStatistics from "../customHooks/useGetStatistics"
import CardStatistic from "../components/CardStatistic"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"
import ErrorAlert from "../components/ErrorAlert"
import PieChart from "../components/PieChart"

function Dashboard() {
  const actualDate = new Date()
  const actualYear = actualDate.getFullYear()
  const actualMonth = (actualDate.getMonth() + 1).toString().padStart(2, "0")
  const { statistics } = useGetStatistics()
  const { $Statistics } = useContext(DataContext)
  const { token } = useContext(LoginContext)
  const [year, setYear] = useState(String(actualYear))
  const [month, setMonth] = useState(String(actualMonth))
  const [createdTitle, setCreatedTitle] = useState("")
  const [createdMessage, setCreatedMessage] = useState("")
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [filterStatistics, setFilterStatistics] = useState<TableData[] | null>(
    null
  )

  const resetAlert = () => {
    setOpenErrorAlert(false)
    setCreatedTitle("")
    setCreatedMessage("")
  }

  const getStatistics = async () => {
    const { status, data } = await $Statistics.get({ token, year, month })

    if (status) {
      setFilterStatistics(data)
    } else {
      setOpenErrorAlert(true)
      setCreatedTitle("Error")
      setCreatedMessage("Por favor establece un año válido")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    }
  }

  useEffect(() => {
    if (statistics) {
      setFilterStatistics(statistics)
    }
  }, [statistics])

  return (
    <WraperContainer>
      <div className="flex sm:flex-row flex-col justify-around items-center">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full h-full flex flex-col sm:flex-row justify-around items-center">
          <ModalFilterStatistics
            setYear={setYear}
            year={year}
            month={month}
            setMonth={setMonth}
            getStatistics={getStatistics}
          />
          <CardStatistic filterStatistics={filterStatistics} />
          {openErrorAlert && (
            <ErrorAlert
              setOpenErrorAlert={setOpenErrorAlert}
              title={createdTitle}
              message={createdMessage}
            />
          )}
        </div>
      </div>
      <div className="w-full h-[500px] p-5 items-center">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full h-full">
          <PieChart filterStatistics={filterStatistics} />
        </div>
      </div>
    </WraperContainer>
  )
}

export default Dashboard
