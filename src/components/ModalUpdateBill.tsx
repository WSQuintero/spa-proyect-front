import { useContext, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"
import SuccessAlert from "./SuccessAlert"
import ErrorAlert from "./ErrorAlert"

function ModalUpdateBill({
  setOpenModal,
  openAlert,
  setOpenAlert,
  initialState
}: {
  setOpenModal: (openModal: boolean) => void
  openAlert: boolean
  setOpenAlert: (openAlert: boolean) => void
  initialState: TableData
}) {
  const { $Bills } = useContext(DataContext)
  const { token } = useContext(LoginContext)

  const { handleSubmit, control } = useForm()
  const [createdTitle, setCreatedTitle] = useState("")
  const [createdMessage, setCreatedMessage] = useState("")
  const [openErrorAlert, setOpenErrorAlert] = useState(false)

  const resetAlert = () => {
    setOpenAlert(false)
    setOpenErrorAlert(false)
    setCreatedTitle("")
    setCreatedMessage("")
  }

  const onSubmit = async (finalData: TableData) => {
    const { status } = await $Bills.update({
      token,
      body: {
        ...finalData,
        amount: Number(finalData.amount),
        paid: finalData.paid === "true"
      },
      id: String(initialState?.id)
    })

    if (status) {
      setOpenAlert(true)
      setCreatedTitle("Correcto")
      setCreatedMessage("Gasto actualizado correctamente")

      setTimeout(() => {
        resetAlert()
        setOpenModal(false)
      }, 2000)
    } else {
      setOpenErrorAlert(true)
      setCreatedTitle("Error")
      setCreatedMessage("Error al actualizar el gasto")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    }
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div id="crud-modal" className=" w-full max-w-md rounded-lg shadow p-5">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto max-h-[98vh]">
            <div className="flex items-center justify-between p-2 md:px-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Actualizar gasto
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => setOpenModal(false)}>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="scheduler"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    ¿Quien actualiza gasto?
                  </label>
                  <Controller
                    name="scheduler"
                    control={control}
                    defaultValue={initialState.scheduler}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="scheduler"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nombre"
                        required
                      />
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="nameBill"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nombre del gasto
                  </label>
                  <Controller
                    name="nameBill"
                    control={control}
                    defaultValue={initialState.nameBill}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="nameBill"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Gasto"
                      />
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    costo
                  </label>
                  <Controller
                    name="amount"
                    control={control}
                    defaultValue={initialState.amount}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        id="amount"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Gasto"
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Fecha
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={initialState.date}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        // min={new Date().toISOString().split("T")[0]}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 mb-2">
                <label htmlFor="paid">Pago</label>
                <Controller
                  name="paid"
                  control={control}
                  defaultValue={initialState.paid}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="paid"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required>
                      <option value="">Seleccione...</option>
                      <option value="true">Pagado</option>
                      <option value="false">No pagado</option>
                    </select>
                  )}
                />
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-black hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"></path>
                </svg>
                Actualizar gasto
              </button>
            </form>
          </div>
        </div>
      </div>
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
    </div>
  )
}

export default ModalUpdateBill
