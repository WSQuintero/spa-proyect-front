import { useState } from "react"
import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import ModalCreateDate from "../components/ModalCreateDate"
import WraperContainer from "../components/WraperContainer"
import useGetDates from "../customHooks/useGetDates"
import ModalUpdateDate from "../components/ModalUpdateDate"

function Dates() {
  const [openAlert, setOpenAlert] = useState(false)
  const { dates } = useGetDates({ openAlert })
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [initialState, setInitialState] = useState({})

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
          />
        ) : (
          <div className="text-center bg-gray-100 p-4">
            No se encontrarón citas para mostrar
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
    </>
  )
}

export default Dates
