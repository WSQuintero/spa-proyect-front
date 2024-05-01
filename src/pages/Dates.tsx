import { useContext, useState } from "react"
import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import ModalCreateDate from "../components/ModalCreateDate"
import WraperContainer from "../components/WraperContainer"
import useGetDates from "../customHooks/useGetDates"
import ModalUpdateDate from "../components/ModalUpdateDate"
import ErrorAlert from "../components/ErrorAlert"
import SuccessAlert from "../components/SuccessAlert"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"

function Dates() {
  const [openAlert, setOpenAlert] = useState(false)
  const { dates } = useGetDates({ openAlert })
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [initialState, setInitialState] = useState({})
  const [createdTitle, setCreatedTitle] = useState("")
  const [createdMessage, setCreatedMessage] = useState("")
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const { $Dates } = useContext(DataContext)
  const { token } = useContext(LoginContext)

  const completeDate = async (initialState: TableData) => {
    const resetAlert = () => {
      setOpenAlert(false)
      setOpenErrorAlert(false)
      setCreatedTitle("")
      setCreatedMessage("")
    }
    const { status } = await $Dates.update({
      token,
      body: { completed: true },
      id: String(initialState?.id)
    })

    if (status) {
      setOpenAlert(true)
      setCreatedTitle("Correcto")
      setCreatedMessage("Cita completada correctamente")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    } else {
      setOpenErrorAlert(true)
      setCreatedTitle("Error")
      setCreatedMessage("Error al completar la cita")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    }
  }

  const deleteDate = async (initialState: TableData) => {
    const resetAlert = () => {
      setOpenAlert(false)
      setOpenErrorAlert(false)
      setCreatedTitle("")
      setCreatedMessage("")
    }
    const { status } = await $Dates.delete({
      token,
      id: String(initialState?.id)
    })

    if (status) {
      setOpenAlert(true)
      setCreatedTitle("Correcto")
      setCreatedMessage("Cita eliminada correctamente")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    } else {
      setOpenErrorAlert(true)
      setCreatedTitle("Error")
      setCreatedMessage("Error al eliminar la cita")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    }
  }
  return (
    <>
      <WraperContainer>
        <div className="w-full p-2 flex justify-end">
          <GeneralButton onClick={() => setOpenModal(true)}>
            Crear
          </GeneralButton>
        </div>
        {dates?.length ? (
          <GeneralTable
            data={dates}
            setOpenUpdateModal={setOpenUpdateModal}
            setInitialState={setInitialState}
            setOpenAlert={setOpenAlert}
            openAlert={openAlert}
            complete={completeDate}
            toDelete={deleteDate}
          />
        ) : (
          <div className="text-center bg-gray-100 p-4">
            No se encontraron citas para mostrar
          </div>
        )}
        {openModal && (
          <ModalCreateDate
            setOpenModal={setOpenModal}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
          />
        )}
        {openUpdateModal && (
          <ModalUpdateDate
            setOpenModal={setOpenUpdateModal}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            initialState={initialState}
          />
        )}
      </WraperContainer>
      {openAlert && (
        <SuccessAlert
          setOpenAlert={setOpenAlert}
          title={createdTitle}
          message={createdMessage}
        />
      )}
      {openErrorAlert && (
        <ErrorAlert
          setOpenErrorAlert={setOpenErrorAlert}
          title={createdTitle}
          message={createdMessage}
        />
      )}
    </>
  )
}

export default Dates
