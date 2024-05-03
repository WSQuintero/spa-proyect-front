import { useContext, useState } from "react"
import { handleLogin } from "../events/login.js"
import { LoginContext } from "../context/LoginContext.tsx"
import { LoginTypes } from "../types/Login"
import useValidateToken from "../customHooks/useValidateToken.tsx"
import GeneralButton from "../components/GeneralButton.tsx"

function Login() {
  const [visible, setVisible] = useState(false)
  const { $Login, setToken } = useContext(LoginContext)
  const [error, setError] = useState<string>("")
  useValidateToken()

  const errors: LoginTypes = {
    "Incorrect password": "Contraseña incorrecta",
    "User not found": "Usuario no encontrado",
    "Error in login": "Error en el inicio de sesión"
  }

  const translateError: string = errors[error] || ""

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center lg:max-h-screen overflow-hidden">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 bg-black flex flex-col justify-center items-center h-full">
        <img
          src="/login.png"
          alt="login"
          className="absolute z-0 mt-20 opacity-35 object-contain max-h-screen"
        />
        <div className="mx-auto max-w-lg text-center z-50">
          <h1 className="text-2xl font-bold sm:text-3xl text-white">
            ¡Bienvenido!
          </h1>
        </div>

        <form
          action="#"
          className="mx-auto mb-0 mt-8 max-w-md space-y-4 w-full"
          onSubmit={(event) => handleLogin(event, $Login, setToken, setError)}>
          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative w-full">
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingresa tu email"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={`${!visible ? "password" : "text"}`}
                name="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingresa la contraseña"
              />

              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                onClick={() => setVisible(!visible)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* <p className="text-sm text-gray-500">
              No account?
              <a className="underline" href="#">
                Sign up
              </a>
            </p> */}

            <GeneralButton
              type="submit"
              className="border border-gray-200 w-full hover:scale-105 transition-transform duration-200 rounded-lg px-5 py-3 text-sm font-medium text-white">
              Iniciar sesión
            </GeneralButton>
          </div>
          <div className="pt-10 w-full text-center">
            <span className="text-red-400">{translateError || ""}</span>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="/login.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default Login
