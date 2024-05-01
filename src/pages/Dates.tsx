import { useState } from "react"
import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import ModalCreateDate from "../components/ModalCreateDate"
import WraperContainer from "../components/WraperContainer"
import useGetDates from "../customHooks/useGetDates"

function Dates() {
  const [openAlert, setOpenAlert] = useState(false)
  const { dates } = useGetDates({ openAlert })
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <WraperContainer>
        <div className="w-full p-2 flex justify-end">
          <GeneralButton onClick={() => setOpenModal(true)}>
            Crear
          </GeneralButton>
        </div>
        {dates ? <GeneralTable data={dates} /> : <div>hola</div>}
        {openModal && (
          <ModalCreateDate
            setOpenModal={setOpenModal}
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
          />
        )}
      </WraperContainer>
    </>
  )
}

export default Dates
