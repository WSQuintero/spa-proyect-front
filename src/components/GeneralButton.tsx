import { GeneralButtonType } from "../types/GeneraButtonType"

function GeneralButton({ children, ...props }: GeneralButtonType) {
  return (
    <button
      className="border border-gray-200 p-2 rounded-md hover:scale-105 transition-transform"
      {...props}>
      {children}
    </button>
  )
}

export default GeneralButton
