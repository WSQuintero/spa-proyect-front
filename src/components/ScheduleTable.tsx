import React from "react"
import useGetDates from "../customHooks/useGetDates"

function ScheduleTable() {
  const hours = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM"
  ]

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  const { dates } = useGetDates({ openAlert: true })

  // Función para verificar si una cita está programada para una hora y día específicos
  const isAppointmentScheduled = (day: string, hour: string) => {
    const startHour = hour.replace(" AM", "").replace(" PM", "") // Elimina " AM" o " PM" para obtener la hora sin la parte de AM/PM

    // Calcula la hora siguiente (hour + 1)
    const nextHour = parseInt(startHour) + 1
    const endHour = nextHour < 10 ? "0" + nextHour : nextHour.toString()

    // Formatea la hora de inicio y la hora final en el formato "HH:MM"
    const startTime = `${startHour}:00`
    const endTime = `${endHour}:00`

    // Verifica si alguna cita coincide con el día y el rango de horas
    return dates?.some(
      (date) =>
        days[new Date(String(date.date)).getDay()] === day &&
        (date.appointmentTime === startTime || date.endTime === endTime)
    )
  }

  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2"></th>
            {days.map((day, index) => (
              <th key={index} className="border border-gray-200 p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td className="border border-gray-200 p-2">{hour}</td>
              {days.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className={`border border-gray-200 p-2 ${
                    isAppointmentScheduled(day, hour) ? "bg-green-300" : ""
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
