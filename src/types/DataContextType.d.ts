import { BillsService } from "../services/billsService"
import { DatesService } from "../services/datesService"
import { SalesService } from "../services/salesService"
import { StatisticsService } from "../services/statisticsService"

export interface DataContextType {
  $Dates: DatesService
  $Bills: BillsService
  $Sales: SalesService
  $Statistics: StatisticsService
}
