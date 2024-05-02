import { ReactNode, useState } from "react"
import SideBar from "./SideBar"

function WraperContainer({ children }: { children: ReactNode }) {
  const [openSiderBar, setOpenSiderBar] = useState(
    window.innerWidth > 1040 ? true : false
  )
  return (
    <div className="flex gap-2 w-[99vw] overflow-hidden h-screen">
      <button
        onClick={() => setOpenSiderBar(!openSiderBar)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg h-[40px] fixed sm:relative sm:h-screen hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg- border border-gray-300 dark:focus:ring-gray-600 bg-white">
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <SideBar openSiderBar={openSiderBar} setOpenSiderBar={setOpenSiderBar} />

      <div className="p-4 max-w-[100%] min-w-[80%] w-full overflow-auto">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full min-h-[90vh]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default WraperContainer
