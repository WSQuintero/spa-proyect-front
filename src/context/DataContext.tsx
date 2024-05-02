import { createContext, ReactNode, useMemo } from "react"
import { DataContextType } from "../types/DataContextType"
import { DatesService } from "../services/datesService"
import { BillsService } from "../services/billsService"
import { SalesService } from "../services/salesService"
import { StatisticsService } from "../services/statisticsService"

export const DataContext = createContext<DataContextType>({
  $Dates: new DatesService(),
  $Bills: new BillsService(),
  $Sales: new SalesService(),
  $Statistics: new StatisticsService()
})

export function DataContextProvider({ children }: { children: ReactNode }) {
  const $Dates = useMemo(() => new DatesService(), [])
  const $Bills = useMemo(() => new BillsService(), [])
  const $Sales = useMemo(() => new SalesService(), [])
  const $Statistics = useMemo(() => new StatisticsService(), [])

  return (
    <DataContext.Provider value={{ $Dates, $Bills, $Sales, $Statistics }}>
      {children}
    </DataContext.Provider>
  )
}
