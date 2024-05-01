import { ReactNode, ButtonHTMLAttributes } from "react"

function GeneralButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className="border border-gray-200 p-2 rounded-md hover:scale-105 transition-transform"
      {...props}>
      {children}
    </button>
  )
}

export default GeneralButton
