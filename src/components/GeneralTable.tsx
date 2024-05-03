import { useLocation } from "react-router"
import { translations } from "../translates/table"
import GeneralButton from "./GeneralButton"
import { MdOutlineDelete } from "react-icons/md"
import React, { ChangeEvent, useState } from "react"
import { orderBills, orderDates, orderSales } from "../constants/constants"
import { convertTo12HourFormat, formatCurrency } from "../assets/utils/utils"
import ModalDetailInformation from "./ModalDetailInformation"
import ModalConfirmation from "./ModalConfirmation"
import { GeneralTableTypeComponent } from "../types/GeneralTableTypes"

function GeneralTable({
  data,
  setOpenUpdateModal,
  setInitialState,
  complete,
  toDelete
}: GeneralTableTypeComponent) {
  const location = useLocation()
  const [activeFilter, setActiveFilter] = useState({ title: "" })
  const [actualElement, setActualElement] = useState<TableData | undefined>()
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [actualData, setActualData] = useState<TableData | undefined>()
  const [filterData, setFilterData] = useState<{
    data: TableData[]
  }>({ data: [] })

  const handleFilter = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    title: string
  ) => {
    const inputValue = event.target.value
    const filteredData = data.filter(
      (item: TableData) =>
        item[title as keyof TableData] !== undefined &&
        String(item[title as keyof TableData])
          ?.toLowerCase()
          ?.includes(inputValue.toLowerCase())
    )

    setFilterData({ data: filteredData })
  }

  const confirm = () => {
    toDelete(actualData)
    setActualData(undefined)
    setTimeout(() => {
      setOpenModalConfirmation(false)
    }, 2000)
  }

  const reject = () => {
    setOpenModalConfirmation(false)
  }
  return (
    <>
      <div className="w-full flex justify-end">
        <GeneralButton
          type="button"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()
            setFilterData({ data: [] })
          }}>
          Restaurar filtros
        </GeneralButton>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-[96%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {data?.length &&
                Object.keys(data[0] || {})
                  .sort((a, b) => {
                    return (
                      (orderDates[a] || orderBills[a] || orderSales[a]) -
                      (orderDates[b] || orderBills[b] || orderSales[b])
                    )
                  })
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
                  onClick={() => setActualElement(dat)}
                  key={String(dat.id)}>
                  {Object.keys(data[0] || {})
                    .sort((a, b) => {
                      return (
                        (orderDates[a] || orderBills[a] || orderSales[a]) -
                        (orderDates[b] || orderBills[b] || orderSales[b])
                      )
                    })
                    .filter((da) => da !== "id")
                    .map((title, colIndex) => (
                      <React.Fragment key={colIndex}>
                        {title === "appointmentTime" || title === "endTime" ? (
                          <td className="px-6 py-4 " key={colIndex}>
                            {convertTo12HourFormat(String(dat[title]))}
                          </td>
                        ) : title === "amount" ? (
                          <td className="px-6 py-4 " key={colIndex}>
                            {formatCurrency(Number(dat[title]))}
                          </td>
                        ) : (
                          <td className="px-6 py-4 " key={colIndex}>
                            {dat[title as keyof TableData] === true
                              ? "Si"
                              : dat[title as keyof TableData] === false
                              ? "No "
                              : dat[title as keyof TableData]}
                          </td>
                        )}
                      </React.Fragment>
                    ))}

                  {location.pathname === "/dates" && (
                    <td className="px-6 py-4 text-right">
                      <GeneralButton
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => {
                          event.stopPropagation()
                          complete(dat)
                        }}>
                        Completar
                      </GeneralButton>
                    </td>
                  )}
                  <td className="px-6 py-4 text-right">
                    <GeneralButton
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        event.stopPropagation()
                        setOpenUpdateModal(true)
                        setInitialState(dat)
                      }}
                      disabled={dat.completed === true || dat.paid === true}>
                      Editar
                    </GeneralButton>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <GeneralButton
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        event.stopPropagation()
                        setActualData(dat)
                        setOpenModalConfirmation(true)
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
      {actualElement?.id && (
        <ModalDetailInformation
          data={actualElement}
          setActualElement={setActualElement}
        />
      )}
      {openModalConfirmation && (
        <ModalConfirmation confirm={confirm} reject={reject} />
      )}
    </>
  )
}

export default GeneralTable
