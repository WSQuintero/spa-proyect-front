import { useLocation } from "react-router"
import { translations } from "../translates/table"
import GeneralButton from "./GeneralButton"
import { useContext, useState } from "react"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"
import SuccessAlert from "./SuccessAlert"
import ErrorAlert from "./ErrorAlert"
import { MdOutlineDelete } from "react-icons/md"

function GeneralTable({
  data,
  setOpenUpdateModal,
  setInitialState,
  setOpenAlert,
  openAlert
}: {
  data: TableData[]
  setOpenUpdateModal: (openUpdateModal: boolean) => void
  setInitialState: (openInitialState: TableData) => void
  setOpenAlert: (openAlert: boolean) => void
  openAlert: boolean
}) {
  const location = useLocation()
  const { $Dates } = useContext(DataContext)
  const { token } = useContext(LoginContext)
  const [createdTitle, setCreatedTitle] = useState("")
  const [createdMessage, setCreatedMessage] = useState("")
  const [openErrorAlert, setOpenErrorAlert] = useState(false)

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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-[96%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {data?.length &&
                Object.keys(data[0] || {})
                  .sort()
                  .filter((da) => da !== "id")
                  .map((title, index) => (
                    <th key={index} scope="col" className="px-6 py-3 w-[20%]">
                      {translations[title]}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((dat) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-transform hover:scale-[1.01] cursor-pointer"
                key={String(dat.id)}>
                {Object.keys(data[0] || {})
                  .sort()
                  .filter((da) => da !== "id")
                  .map((title, colIndex) => (
                    <td className="px-6 py-4" key={colIndex}>
                      {dat[title] === true
                        ? "Si"
                        : dat[title] === false
                        ? "No "
                        : dat[title]}
                    </td>
                  ))}
                {location.pathname === "/dates" && (
                  <td className="px-6 py-4 text-right">
                    <GeneralButton
                      onClick={() => {
                        completeDate(dat)
                      }}>
                      Completar
                    </GeneralButton>
                  </td>
                )}
                <td className="px-6 py-4 text-right">
                  <GeneralButton
                    onClick={() => {
                      setOpenUpdateModal(true)
                      setInitialState(dat)
                    }}>
                    Editar
                  </GeneralButton>
                </td>
                {location.pathname === "/dates" && (
                  <td className="px-6 py-4 text-right">
                    <GeneralButton
                      onClick={() => {
                        deleteDate(dat)
                      }}>
                      <MdOutlineDelete />
                    </GeneralButton>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {openAlert && (
          <SuccessAlert
            setOpenAlert={setOpenAlert}
            title={createdTitle}
            message={createdMessage}
          />
        )}
      </div>
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

export default GeneralTable
