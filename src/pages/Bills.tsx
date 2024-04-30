import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import WraperContainer from "../components/WraperContainer"

function Bills() {
  return (
    <WraperContainer>
      <div className="w-full p-2 flex justify-end">
        <GeneralButton>Crear</GeneralButton>
      </div>
      <GeneralTable />
    </WraperContainer>
  )
}

export default Bills
