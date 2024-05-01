import { useState } from "react"
import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import WraperContainer from "../components/WraperContainer"
import useGetBills from "../customHooks/useGetBills"
import ModalCreateBill from "../components/ModalCreateBill"
import ModalUpdateBill from "../components/ModalUpdateBill"

function Bills() {
  const [openAlert, setOpenAlert] = useState(false)
  const { bills } = useGetBills({ openAlert })
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [initialState, setInitialState] = useState({})

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
    </WraperContainer>
  )
}

export default Bills
