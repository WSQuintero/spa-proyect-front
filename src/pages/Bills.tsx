import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import WraperContainer from "../components/WraperContainer"
import useGetBills from "../customHooks/useGetBills"

function Bills() {
  const { bills } = useGetBills()
  return (
    <WraperContainer>
      <div className="w-full p-2 flex justify-end">
        <GeneralButton>Crear</GeneralButton>
      </div>
      {bills ? <GeneralTable data={bills} /> : <div>hola</div>}
    </WraperContainer>
  )
}

export default Bills
