import {
  addHourToTime,
  convertTo12HourFormat,
  getDaysOfWeekStartingFromMonday
} from "../assets/utils/utils"
import useGetDates from "../customHooks/useGetDates"

function ScheduleTable() {
  const hours = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00"
  ]

  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
  ]

  const { dates } = useGetDates({ openAlert: true })

  const daysOfWeekStartingFromMonday = getDaysOfWeekStartingFromMonday()

  // Función para verificar si un turno está ocupado en un día y hora específicos
  const isSlotOccupied = (day, hour) => {
    // Recorre todas las citas para verificar si hay alguna que coincida con el día y hora especificados

    return dates?.some((date) => {
      const dateHour = date.appointmentTime.split(":")[0]
      // Verifica si la cita está en el mismo día y si su hora de inicio coincide con el intervalo de la tabla
      console.log(hour.split(":")[0])
      if (
        date.date === day &&
        parseInt(dateHour) <= parseInt(hour.split(":")[0]) &&
        parseInt(date.endTime.split(":")[0]) > parseInt(hour.split(":")[0])
      ) {
        return true
      }
      return false
    })
  }

  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2"></th>
            {daysOfWeekStartingFromMonday.map((day, index) => (
              <th key={index} className="border border-gray-200 p-2">
                {days[index]}
                <br />
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td className="border border-gray-200 p-2">
                {convertTo12HourFormat(hour)}
              </td>
              {daysOfWeekStartingFromMonday.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className={`border border-gray-200 p-2 ${
                    isSlotOccupied(day, hour) ? "bg-green-500" : ""
                  }`}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleTable
