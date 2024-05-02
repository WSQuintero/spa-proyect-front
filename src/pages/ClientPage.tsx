import ScheduleTable from "../components/ScheduleTable"

function ClientPage() {
  return (
    <div className="flex justify-center items-center w-full p-4">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-[90%] h-full flex justify-around items-center">
        <ScheduleTable />
      </div>
    </div>
  )
}

export default ClientPage
