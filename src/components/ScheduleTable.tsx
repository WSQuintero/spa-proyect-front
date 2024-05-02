import { useMemo } from "react"
import useGetDates from "../customHooks/useGetDates"
import { days, hours } from "../constants/constants"
import {
  convertTo12HourFormat,
  getDaysOfWeekStartingFromMonday
} from "../assets/utils/utils"

function ScheduleTable() {
  const { dates } = useGetDates({ openAlert: true })
  const daysOfWeekStartingFromMonday = getDaysOfWeekStartingFromMonday()

  const isSlotOccupied = useMemo(() => {
    return (day: string, hour: string) => {
      return dates?.find((date) => {
        const dateHour = String(date.appointmentTime).split(":")[0]
        if (
          date.date === day &&
          parseInt(dateHour) <= parseInt(hour.split(":")[0]) &&
          parseInt(String(date.endTime).split(":")[0]) >
            parseInt(hour.split(":")[0])
        ) {
          return true
        }
        return false
      })
    }
  }, [dates])

  return (
    <div className="overflow-x-auto  w-full border border-gray-600">
      <table className="min-w-full border-collapse border border-gray-800 ">
        <thead>
          <tr>
            <th className="border border-gray-800 p-2"></th>
            {daysOfWeekStartingFromMonday?.map((day, index) => (
              <th key={index} className="border border-gray-800 p-2 ">
                {days[index]}
                <br />
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td className="border border-gray-800 p-2 text-center">
                {convertTo12HourFormat(hour)}
              </td>
              {daysOfWeekStartingFromMonday?.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className={`border border-gray-200 p-2 text-white text-center ${
                    isSlotOccupied(day, hour)?.clientName ? "bg-green-500" : ""
                  }`}>
                  {isSlotOccupied(day, hour)?.clientName}
                  <br />
                  {isSlotOccupied(day, hour)?.requestedService}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleTable
