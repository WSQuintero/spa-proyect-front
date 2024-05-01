import { useLocation } from "react-router"
import { translations } from "../translates/table"
import GeneralButton from "./GeneralButton"
import { MdOutlineDelete } from "react-icons/md"
import { ChangeEvent, useState } from "react"

function GeneralTable({
  data,
  setOpenUpdateModal,
  setInitialState,
  complete,
  toDelete
}: {
  data: TableData[]
  setOpenUpdateModal: (openUpdateModal: boolean) => void
  setInitialState: (openInitialState: TableData) => void
  setOpenAlert: (openAlert: boolean) => void
  openAlert: boolean
  complete: (initialState: TableData) => void
  toDelete: (initialState: TableData) => void
}) {
  const location = useLocation()
  const [activeFilter, setActiveFilter] = useState({ title: "" })
  const [filterData, setFilterData] = useState<{
    data: TableData[]
  }>({ data: [] })

  const handleFilter = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    title: string
  ) => {
    const inputValue = event.target.value
    const filteredData = data.filter(
      (item) =>
        item[title] !== undefined &&
        String(item[title])?.toLowerCase()?.includes(inputValue.toLowerCase())
    )
    console.log(filteredData)

    setFilterData({ data: filteredData })
  }

  return (
    <>
      <div className="w-full flex justify-end">
        <GeneralButton
          type="button"
          onClick={() => setFilterData({ data: [] })}>
          Restaurar filtros
        </GeneralButton>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-[96%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {data?.length &&
                Object.keys(data[0] || {})
                  .sort()
                  .filter((da) => da !== "id")
                  .map((title, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-5 py-3  whitespace-nowrap h-20"
                      onMouseOver={() =>
                        setActiveFilter({ title: translations[title] })
                      }
                      onMouseOut={() => setActiveFilter({ title: "" })}>
                      <div className="flex flex-col justify-between h-[80%]">
                        <span className="w-[120px] ">
                          {translations[title]}
                        </span>

                        {activeFilter.title === translations[title] && (
                          <>
                            {title === "completed" && (
                              <select
                                onChange={(event) => handleFilter(event, title)}
                                defaultValue="select">
                                <option value="select" disabled>
                                  Seleccione
                                </option>
                                <option value="true">Completado</option>
                                <option value="false">No completado</option>
                                <option value="">Todos</option>
                              </select>
                            )}
                            {title === "paid" && (
                              <select
                                onChange={(event) => handleFilter(event, title)}
                                defaultValue="select">
                                <option value="select" disabled>
                                  Seleccione
                                </option>
                                <option value="true">Pagado</option>
                                <option value="false">No pagado</option>
                                <option value="">Todos</option>
                              </select>
                            )}
                            {title === "date" && (
                              <>
                                <input
                                  type="date"
                                  onChange={(event) =>
                                    handleFilter(event, title)
                                  }
                                  className="h-[40px]"
                                />
                              </>
                            )}
                            {title !== "date" &&
                              title !== "completed" &&
                              title !== "paid" && (
                                <input
                                  type="text"
                                  className="w-[120px]"
                                  placeholder={translations[title]}
                                  onChange={(event) =>
                                    handleFilter(event, title)
                                  }
                                />
                              )}
                          </>
                        )}
                      </div>
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {((filterData?.data.length && filterData?.data) || data)?.map(
              (dat) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-transform hover:scale-[1.01] cursor-pointer w-[400px]"
                  key={String(dat.id)}>
                  {Object.keys(data[0] || {})
                    .sort()
                    .filter((da) => da !== "id")
                    .map((title, colIndex) => (
                      <td className="px-6 py-4 " key={colIndex}>
                        {dat[title] === true
                          ? "Si"
                          : dat[title] === false
                          ? "No "
                          : dat[title]}
                      </td>
                    ))}
                  {location.pathname === "/dates" && (
                    <td className="px-6 py-4 text-right">
                      <GeneralButton
                        onClick={() => {
                          complete(dat)
                        }}>
                        Completar
                      </GeneralButton>
                    </td>
                  )}
                  <td className="px-6 py-4 text-right">
                    <GeneralButton
                      onClick={() => {
                        setOpenUpdateModal(true)
                        setInitialState(dat)
                      }}
                      disabled={dat.completed === true || dat.paid === true}>
                      Editar
                    </GeneralButton>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <GeneralButton
                      onClick={() => {
                        toDelete(dat)
                      }}>
                      <MdOutlineDelete />
                    </GeneralButton>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default GeneralTable
