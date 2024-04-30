import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import WraperContainer from "../components/WraperContainer"

function Sales() {
  return (
    <WraperContainer>
      <div className="w-full p-2 flex justify-end">
        <GeneralButton>Crear</GeneralButton>
      </div>
      <GeneralTable />
    </WraperContainer>
  )
}

export default Sales
