import { useContext, useEffect, useState } from "react"
import WraperContainer from "../components/WraperContainer"
import GeneralButton from "../components/GeneralButton"
import ModalFilterStatistics from "../components/ModalFilterStatistics"
import useGetStatistics from "../customHooks/useGetStatistics"
import CardStatistic from "../components/CardStatistic"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"
import ErrorAlert from "../components/ErrorAlert"
import ScheduleTable from "../components/ScheduleTable"
import PieChart from "../components/PieChart"

function Dashboard() {
  const actualDate = new Date()
  const actualYear = actualDate.getFullYear()
  const actualMonth = (actualDate.getMonth() + 1).toString().padStart(2, "0")
  const { statistics } = useGetStatistics()
  const { $Statistics } = useContext(DataContext)
  const { token } = useContext(LoginContext)
  const [openFilter, setOpenFilter] = useState(false)
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
      <div className="w-full flex justify-end">
        <GeneralButton onClick={() => setOpenFilter(!openFilter)}>
          {!openFilter ? "Filtrar estadísticas" : "Guardar filtro"}
        </GeneralButton>
      </div>

      <div className="flex sm:flex-row flex-col justify-around items-center">
        {openFilter && (
          <ModalFilterStatistics
            setYear={setYear}
            year={year}
            month={month}
            setMonth={setMonth}
            getStatistics={getStatistics}
          />
        )}
        <CardStatistic filterStatistics={filterStatistics} />
        {openErrorAlert && (
          <ErrorAlert
            setOpenErrorAlert={setOpenErrorAlert}
            title={createdTitle}
            message={createdMessage}
          />
        )}
      </div>
      <div className="w-full h-[500px] p-5 items-center">
        <PieChart filterStatistics={filterStatistics} />
      </div>
      <ScheduleTable />
    </WraperContainer>
  )
}

export default Dashboard
