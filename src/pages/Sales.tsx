import GeneralButton from "../components/GeneralButton"
import GeneralTable from "../components/GeneralTable"
import WraperContainer from "../components/WraperContainer"
import useGetSales from "../customHooks/useGetSales"

function Sales() {
  const { sales } = useGetSales()

  return (
    <WraperContainer>
      <div className="w-full p-2 flex justify-end">
        <GeneralButton>Crear</GeneralButton>
      </div>
      {sales && <GeneralTable data={sales} />}
    </WraperContainer>
  )
}

export default Sales
