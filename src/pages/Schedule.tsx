import ScheduleTable from "../components/ScheduleTable"
import WraperContainer from "../components/WraperContainer"

function Schedule() {
  return (
    <WraperContainer>
      <div className="flex justify-center items-center w-full p-2">
        <ScheduleTable />
      </div>
    </WraperContainer>
  )
}

export default Schedule
