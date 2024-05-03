import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const PieChart = ({
  filterStatistics
}: {
  filterStatistics: TableData[] | null
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        const pieChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Gatos", "Ventas"],
            datasets: [
              {
                data: [
                  filterStatistics?.length &&
                    filterStatistics[0]?.monthlyTotalExpenses,
                  filterStatistics?.length &&
                    filterStatistics[0]?.monthlyTotalSales
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.7)",
                  "rgba(54, 162, 235, 0.7)",
                  "rgba(255, 206, 86, 0.7)"
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)"
                ],
                borderWidth: 1
              }
            ]
          }
        })

        return () => {
          pieChart.destroy()
        }
      }
    }
  }, [filterStatistics])

  return (
    <div className="h-full w-full flex justify-center">
      <canvas ref={chartRef} width="200" height="200"></canvas>
    </div>
  )
}

export default PieChart
