import React from "react"
import { convertTo12HourFormat } from "../assets/utils/utils"
import { translations } from "../translates/table"
import { IoCloseCircleOutline } from "react-icons/io5"
import GeneralButton from "./GeneralButton"
import { orderBills, orderDates, orderSales } from "../constants/constants"

function ModalDetailInformation({
  data,
  setActualElement
}: {
  data: TableData | undefined
  setActualElement: (actualElement: TableData) => void
}) {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-35 flex justify-center items-center">
      <div className="relative w-[300px] h-[90%] bg-white flex flex-col justify-center items-center rounded-lg">
        <>
          <GeneralButton
            className="absolute top-2 right-2"
            onClick={(event) => {
              event.stopPropagation()
              setActualElement({})
            }}>
            <IoCloseCircleOutline size={30} />
          </GeneralButton>
          {data &&
            Object.entries(data)
              ?.sort((a, b) => {
                return (
                  (orderDates[a[0]] || orderBills[a[0]] || orderSales[a[0]]) -
                  (orderDates[b[0]] || orderBills[b[0]] || orderSales[b[0]])
                )
              })
              .map((dat) => (
                <React.Fragment key={dat[0]}>
                  {dat[0] !== "id" && (
                    <p className="mt-5 border  w-[80%] p-1 border-gray-300 shadow-md text-sm">
                      <span className="font-bold">
                        {translations[dat[0]]}:{" "}
                      </span>
                      {dat[1] === true
                        ? "Si"
                        : dat[1] === false
                        ? "No"
                        : dat[0] === "appointmentTime" || dat[0] === "endTime"
                        ? convertTo12HourFormat(String(dat[1]))
                        : dat[1]}
                    </p>
                  )}
                </React.Fragment>
              ))}
        </>
      </div>
    </div>
  )
}

export default ModalDetailInformation
