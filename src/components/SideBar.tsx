import clsx from "clsx"
import { IoIosArrowBack } from "react-icons/io"
import { NavLink } from "react-router-dom"
import { Sidebar } from "../types/Sidebar"
import { CiLogout } from "react-icons/ci"
import useLogout from "../customHooks/useLogout"
import { GrSchedule } from "react-icons/gr"
import { GiExpense } from "react-icons/gi"
import { MdPointOfSale } from "react-icons/md"
import { GrSchedules } from "react-icons/gr"

function SideBar({ setOpenSiderBar, openSiderBar }: Sidebar) {
  const logout = useLogout()
  return (
    <aside
      id="default-sidebar"
      className={clsx(
        " top-0 left-0 z-40 w-full sm:w-64 h-screen transition-transform absolute sm:relative ",
        !openSiderBar && "-translate-x-full sm:hidden",
        openSiderBar && "translate-x-0"
      )}
      aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-black bg-opacity-90 dark:bg-gray-800 text-gray-200">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
                  : isActive
                  ? "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 text-gray-900 hover:text-gray-900 bg-gray-200 w-full"
                  : "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
              }>
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover: dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dates"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
                  : isActive
                  ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900 bg-gray-200 w-full"
                  : "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
              }>
              <GrSchedule />

              <span className="flex-1 ms-3 whitespace-nowrap">Citas</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bills"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
                  : isActive
                  ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900 bg-gray-200 w-full"
                  : "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
              }>
              <GiExpense />

              <span className="flex-1 ms-3 whitespace-nowrap">Gastos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sales"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
                  : isActive
                  ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900 bg-gray-200 w-full"
                  : "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
              }>
              <MdPointOfSale />
              <span className="flex-1 ms-3 whitespace-nowrap">Ventas</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/schedule"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
                  : isActive
                  ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900 bg-gray-200 w-full"
                  : "flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-gray-900  w-full"
              }>
              <GrSchedules />

              <span className="flex-1 ms-3 whitespace-nowrap">Horario</span>
            </NavLink>
          </li>
          <li className="pt-20">
            <button onClick={() => logout()} className=" flex gap-2">
              <CiLogout size={25} />
              <span>Logout</span>
            </button>
          </li>
          <li className="mt-20 p-10 sm:hidden">
            <button onClick={() => setOpenSiderBar(false)}>
              <IoIosArrowBack size={30} />
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SideBar
