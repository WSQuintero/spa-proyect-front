import { translations } from "../translates/table"

function GeneralTable({ data }: { data: TableData[] }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-[96%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {data?.length &&
              Object.keys(data[0] || {})
                .sort()
                .map((title, index) => (
                  <th key={index} scope="col" className="px-6 py-3 w-[20%]">
                    {translations[title]}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((dat) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-transform hover:scale-[1.01] cursor-pointer"
              key={String(dat.id)}>
              {Object.keys(data[0] || {})
                .sort()
                .map((title, colIndex) => (
                  <td className="px-6 py-4" key={colIndex}>
                    {dat[title] === true
                      ? "Pagado"
                      : dat[title] === false
                      ? "No pago"
                      : dat[title]}
                  </td>
                ))}
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GeneralTable
