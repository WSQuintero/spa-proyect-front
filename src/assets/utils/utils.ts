export function formatCurrency(number: number) {
  const parts = number.toFixed(0).toString().split(".")
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return "$" + integerPart
}

export function getDaysOfWeekStartingFromMonday() {
  const today = new Date()
  const currentDay = today.getDay()
  const mondayOffset = currentDay === 0 ? 6 : currentDay - 1

  const mondayTimestamp = today.getTime() - mondayOffset * 24 * 60 * 60 * 1000
  const mondayDate = new Date(mondayTimestamp)

  const daysOfWeek = []

  for (let i = 0; i < 7; i++) {
    const day = new Date(mondayDate)
    day.setDate(day.getDate() + i)
    const formattedDate = day.toISOString().slice(0, 10)
    daysOfWeek.push(formattedDate)
  }

  return daysOfWeek
}

export function addHourToTime(timeString: string, hoursToAdd: number) {
  const [hours, minutes] = timeString.split(":")
  const date = new Date()
  date.setHours(parseInt(hours, 10))
  date.setMinutes(parseInt(minutes, 10))

  date.setHours(date.getHours() + hoursToAdd)

  const newHours = ("0" + date.getHours()).slice(-2)
  const newMinutes = ("0" + date.getMinutes()).slice(-2)
  return `${newHours}:${newMinutes}`
}

export function convertTo12HourFormat(time24h: string) {
  const [hours, minutes] = time24h.split(":")

  let hours12h = parseInt(hours, 10)
  const amPm = hours12h >= 12 ? "pm" : "am"
  if (hours12h === 0) {
    hours12h = 12 // 12:00 am
  } else if (hours12h > 12) {
    hours12h -= 12
  }

  return `${hours12h}:${minutes} ${amPm}`
}
