import { useContext, useState } from "react"
import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import WraperContainer from "../components/WraperContainer"
import useGetBills from "../customHooks/useGetBills"
import ModalCreateBill from "../components/ModalCreateBill"
import ModalUpdateBill from "../components/ModalUpdateBill"
import SuccessAlert from "../components/SuccessAlert"
import ErrorAlert from "../components/ErrorAlert"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"

function Bills() {
  const [openAlert, setOpenAlert] = useState(false)
  const { bills } = useGetBills({ openAlert })
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [initialState, setInitialState] = useState({})
  const [createdTitle, setCreatedTitle] = useState("")
  const [createdMessage, setCreatedMessage] = useState("")
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const { $Bills } = useContext(DataContext)
  const { token } = useContext(LoginContext)

  const deleteBill = async (initialState: TableData) => {
    const resetAlert = () => {
      setOpenAlert(false)
      setOpenErrorAlert(false)
      setCreatedTitle("")
      setCreatedMessage("")
    }
    const { status } = await $Bills.delete({
      token,
      id: String(initialState?.id)
    })

    if (status) {
      setOpenAlert(true)
      setCreatedTitle("Correcto")
      setCreatedMessage("Gasto eliminado correctamente")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    } else {
      setOpenErrorAlert(true)
      setCreatedTitle("Error")
      setCreatedMessage("Error al eliminar el gasto")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    }
  }
  return (
    <WraperContainer>
      <div className="w-full p-2 flex justify-end">
        <GeneralButton onClick={() => setOpenModal(true)}>Crear</GeneralButton>
      </div>
      {bills ? (
        <GeneralTable
          data={bills}
          setOpenUpdateModal={setOpenUpdateModal}
          setInitialState={setInitialState}
          setOpenAlert={setOpenAlert}
          openAlert={openAlert}
          complete={() => null}
          toDelete={deleteBill}
        />
      ) : (
        <div>hola</div>
      )}
      {openModal && (
        <ModalCreateBill
          setOpenModal={setOpenModal}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
        />
      )}
      {openUpdateModal && (
        <ModalUpdateBill
          setOpenModal={setOpenUpdateModal}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          initialState={initialState}
        />
      )}
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
    </WraperContainer>
  )
}

export default Bills
