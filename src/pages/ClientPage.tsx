import ScheduleTable from "../components/ScheduleTable"

function ClientPage() {
  return (
    <div className="flex justify-center items-center w-full p-4 h-screen">
      <img
        src="bgcolor.png"
        alt="bgcolor"
        className="w-full object-contain absolute z-0 max-h-screen bg-no-repeat opacity-50"
      />
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-[90%] h-full flex justify-around items-center z-50">
        <ScheduleTable />
      </div>
    </div>
  )
}

export default ClientPage
