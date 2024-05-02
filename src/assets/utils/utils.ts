export function formatCurrency(number: number) {
  const parts = number.toFixed(0).toString().split(".")
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return "$" + integerPart
}
