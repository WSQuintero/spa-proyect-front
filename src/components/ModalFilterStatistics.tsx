import { months } from "../constants/constants"
import GeneralButton from "./GeneralButton"

function ModalFilterStatistics({
  setYear,
  year,
  month,
  setMonth,
  getStatistics
}: {
  setYear: (year: string) => void
  year: string
  month: string
  setMonth: (month: string) => void
  getStatistics: () => void
}) {
  const sortedMonths = Object.entries(months).sort(
    (a, b) => parseInt(a[0]) - parseInt(b[0])
  )
  return (
    <div id="crud-modal" className=" w-full max-w-md rounded-lg shadow p-5">
      <div className="relative p-4 w-full max-w-md max-h-full flex flex-col justify-center items-center gap-5">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto max-h-[90vh] ">
          <div className="flex flex-col sm:flex-row items-center justify-center p-2 md:px-5 border-b rounded-t dark:border-gray-600 ">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Filtrar estadísticas
            </h3>
          </div>
          <input
            type="number"
            placeholder="Año"
            value={year}
            min={1900}
            max={2100}
            step="1"
            onChange={(event) => {
              Number(event.target.value) < 2100 && setYear(event.target.value)
            }}
            className="text-center sm:w-2/4 w-full"
          />
          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            className="text-center sm:w-2/4 w-full">
            <option value={""}>Seleccione un mes</option>
            {sortedMonths.map((month) => (
              <option key={month[1]} value={month[0]}>
                {month[1]}
              </option>
            ))}
          </select>
        </div>
        <GeneralButton
          className="w-[200px] p-2 border border-gray-200 rounded-xl"
          onClick={() => getStatistics()}>
          Ver
        </GeneralButton>
      </div>
    </div>
  )
}

export default ModalFilterStatistics
