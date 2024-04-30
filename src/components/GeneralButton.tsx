import { ReactNode } from "react"

function GeneralButton({ children }: { children: ReactNode }) {
  return (
    <button className="border border-gray-200 p-2 rounded-md hover:scale-105 transition-transform ">
      {children}
    </button>
  )
}

export default GeneralButton
