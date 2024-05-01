import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import WraperContainer from "../components/WraperContainer"
import useGetDates from "../customHooks/useGetDates"

function Dates() {
  const { dates } = useGetDates()

  return (
    <WraperContainer>
      <div className="w-full p-2 flex justify-end">
        <GeneralButton>Crear</GeneralButton>
      </div>
      {dates ? <GeneralTable data={dates} /> : <div>hola</div>}
    </WraperContainer>
  )
}

export default Dates
