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
import ModalCreateSale from "../components/ModalCreateSale"

function Dates() {
  const [openAlert, setOpenAlert] = useState(false)
  const { dates } = useGetDates({ openAlert })
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [initialState, setInitialState] = useState<TableData>({})
  const [createdTitle, setCreatedTitle] = useState("")
  const [createdMessage, setCreatedMessage] = useState("")
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const { $Dates } = useContext(DataContext)
  const { token } = useContext(LoginContext)
  const [openCreateSale, setOpenCreateSale] = useState(false)

  const resetAlert = () => {
    setOpenAlert(false)
    setOpenErrorAlert(false)
    setCreatedTitle("")
    setCreatedMessage("")
  }
  const openSale = async (initialState: TableData) => {
    setInitialState(initialState)
    if (initialState.completed === true) {
      setOpenErrorAlert(true)
      setCreatedTitle("Error")
      setCreatedMessage("No se puede completar una cita ya completada")
      setTimeout(() => {
        resetAlert()
      }, 2000)
      return
    }
    setOpenCreateSale(true)
  }

  const completeDate = async () => {
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
          <GeneralButton
            onClick={(event) => {
              event.stopPropagation()
              setOpenModal(true)
            }}>
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
            complete={openSale}
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
      {openAlert && createdTitle && createdMessage && (
        <SuccessAlert
          setOpenAlert={setOpenAlert}
          title={createdTitle}
          message={createdMessage}
        />
      )}
      {openErrorAlert && createdTitle && createdMessage && (
        <ErrorAlert
          setOpenErrorAlert={setOpenErrorAlert}
          title={createdTitle}
          message={createdMessage}
        />
      )}
      {openCreateSale && (
        <ModalCreateSale
          setOpenModal={setOpenCreateSale}
          setOpenAlert={setOpenAlert}
          openAlert={openAlert}
          completeDate={completeDate}
        />
      )}
    </>
  )
}

export default Dates
