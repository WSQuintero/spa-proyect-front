import { useContext, useState } from "react"
import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import WraperContainer from "../components/WraperContainer"
import SuccessAlert from "../components/SuccessAlert"
import ErrorAlert from "../components/ErrorAlert"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"
import useGetSales from "../customHooks/useGetSales"
import ModalCreateSale from "../components/ModalCreateSale"
import ModalUpdateSale from "../components/ModalUpdateSale"

function Sales() {
  const [openAlert, setOpenAlert] = useState(false)
  const { sales } = useGetSales({ openAlert })
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [initialState, setInitialState] = useState({})
  const [createdTitle, setCreatedTitle] = useState("")
  const [createdMessage, setCreatedMessage] = useState("")
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const { $Sales } = useContext(DataContext)
  const { token } = useContext(LoginContext)

  const deleteBill = async (initialState: TableData | undefined) => {
    const resetAlert = () => {
      setOpenAlert(false)
      setOpenErrorAlert(false)
      setCreatedTitle("")
      setCreatedMessage("")
    }
    const { status } = await $Sales.delete({
      token,
      id: String(initialState?.id)
    })

    if (status) {
      setOpenAlert(true)
      setCreatedTitle("Correcto")
      setCreatedMessage("Venta eliminada correctamente")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    } else {
      setOpenErrorAlert(true)
      setCreatedTitle("Error")
      setCreatedMessage("Error al eliminar la venta")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    }
  }
  return (
    <WraperContainer>
      <div className="w-full p-2 flex justify-end">
        <GeneralButton
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()
            setOpenModal(true)
          }}>
          Crear
        </GeneralButton>
      </div>
      {sales?.length ? (
        <GeneralTable
          data={sales}
          setOpenUpdateModal={setOpenUpdateModal}
          setInitialState={setInitialState}
          setOpenAlert={setOpenAlert}
          openAlert={openAlert}
          complete={() => null}
          toDelete={deleteBill}
        />
      ) : (
        <div className="text-center bg-gray-100 p-4">
          No se encontraron ventas para mostrar
        </div>
      )}
      {openModal && (
        <ModalCreateSale
          setOpenModal={setOpenModal}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          completeDate={() => null}
        />
      )}
      {openUpdateModal && (
        <ModalUpdateSale
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

export default Sales
