import { BillsService } from "../services/billsService"
import { DatesService } from "../services/datesService"
import { SalesService } from "../services/salesService"

export interface DataContextType {
  $Dates: DatesService
  $Bills: BillsService
  $Sales: SalesService
}
