import { createContext, ReactNode } from "react"
import { DataContextType } from "../types/DataContextType"
import { DatesService } from "../services/datesService"
import { BillsService } from "../services/billsService"
import { SalesService } from "../services/salesService"

export const DataContext = createContext<DataContextType>({
  $Dates: new DatesService(),
  $Bills: new BillsService(),
  $Sales: new SalesService()
})

export function DataContextProvider({ children }: { children: ReactNode }) {
  const $Dates = new DatesService()
  const $Bills = new BillsService()
  const $Sales = new SalesService()

  return (
    <DataContext.Provider value={{ $Dates, $Bills, $Sales }}>
      {children}
    </DataContext.Provider>
  )
}
