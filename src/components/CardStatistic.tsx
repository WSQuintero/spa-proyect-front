import { formatCurrency } from "../assets/utils/utils.ts"
import { months } from "../constants/constants.ts"

function CardStatistic({
  filterStatistics
}: {
  filterStatistics: TableData[] | null
}) {
  return (
    <div className=" shadow-lg  bg-white/70">
      {filterStatistics?.map((data, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src="https://media.istockphoto.com/id/1383836607/sv/vektor/growing-graph-icon-with-long-shadow-on-blank-background-flat-design.jpg?s=612x612&w=0&k=20&c=5ltYhJCoVfqCeXXqtwEVSdp33aln2KBjDbl4bTRqCPQ="
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {months[data.month as keyof typeof months]} de {data.year}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <span className="font-bold">Gastos del mes: </span>
              {formatCurrency(Number(data.monthlyTotalExpenses))}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <span className="font-bold">Ventas del mes: </span>
              {formatCurrency(Number(data.monthlyTotalSales))}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <span className="font-bold">Ganancias totales: </span>

              {formatCurrency(Number(data.totalProfitAmount))}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardStatistic
