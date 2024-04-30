import ReactDOM from "react-dom/client"
import { RouterProvider as Router } from "react-router-dom"
import router from "./router/router"
import { LoginContextProvider } from "./context/LoginContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LoginContextProvider>
    <Router router={router} />
  </LoginContextProvider>
)
