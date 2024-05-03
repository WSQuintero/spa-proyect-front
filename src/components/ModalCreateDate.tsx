import { useContext, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { DataContext } from "../context/DataContext"
import { LoginContext } from "../context/LoginContext"
import SuccessAlert from "./SuccessAlert"
import ErrorAlert from "./ErrorAlert"

function ModalCreateDate({
  setOpenModal,
  openAlert,
  setOpenAlert
}: {
  setOpenModal: (openModal: boolean) => void
  openAlert: boolean
  setOpenAlert: (openAlert: boolean) => void
}) {
  const { $Dates } = useContext(DataContext)
  const { token } = useContext(LoginContext)

  const { handleSubmit, control } = useForm()
  const [initialTime, setInitialTime] = useState("")
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
    const { status } = await $Dates.create({
      token,
      body: { ...finalData, completed: false }
    })

    if (status) {
      setCreatedTitle("Correcto")
      setCreatedMessage("Cita creada correctamente")
      setOpenAlert(true)

      setTimeout(() => {
        resetAlert()
        setOpenModal(false)
      }, 2000)
    } else {
      setOpenErrorAlert(true)
      setCreatedTitle("Error")
      setCreatedMessage("Error al crear la cita")

      setTimeout(() => {
        resetAlert()
      }, 2000)
    }
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div id="crud-modal" className=" w-full max-w-md rounded-lg shadow p-5">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-2 md:px-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Agendar nueva cita
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
                    Quien agenda
                  </label>
                  <Controller
                    name="scheduler"
                    control={control}
                    defaultValue=""
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
                    htmlFor="clientName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nombre del cliente
                  </label>
                  <Controller
                    name="clientName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="clientName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nombre"
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="clientPhone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Teléfono de cliente
                  </label>
                  <Controller
                    name="clientPhone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        id="clientPhone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="322232****"
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
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="appointmentTime">Hora de la cita</label>
                  <Controller
                    name="appointmentTime"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="time"
                        id="appointmentTime"
                        value={initialTime || field.value}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        onChange={(event) => {
                          setInitialTime(event.target.value)
                          field.onChange(event)
                        }}
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="endTime"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Finalización de la cita
                  </label>
                  <Controller
                    name="endTime"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="time"
                        id="endTime"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        min={initialTime}
                      />
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="requestedService"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Servicio solicitado
                  </label>
                  <Controller
                    name="requestedService"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <textarea
                        {...field}
                        id="requestedService"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Descripción de la cita"></textarea>
                    )}
                  />
                </div>
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
                Agregar nueva cita
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

export default ModalCreateDate
