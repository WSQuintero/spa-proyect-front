export const months = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre"
}

export const hours = [
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

export const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
]

export const orderDates: { [key: string]: number } = {
  date: 0,
  requestedService: 1,
  appointmentTime: 2,
  endTime: 3,
  clientName: 4,
  clientPhone: 5,
  scheduler: 6,
  completed: 7
}

export const orderBills: { [key: string]: number } = {
  date: 0,
  nameBill: 1,
  amount: 2,
  paid: 3,
  scheduler: 4
}

export const orderSales: { [key: string]: number } = {
  date: 0,
  nameSale: 1,
  amount: 2,
  paid: 3,
  scheduler: 4
}
