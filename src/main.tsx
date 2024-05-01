import ReactDOM from "react-dom/client"
import { RouterProvider as Router } from "react-router-dom"
import router from "./router/router"
import { LoginContextProvider } from "./context/LoginContext"
import "./index.css"
import { DataContextProvider } from "./context/DataContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LoginContextProvider>
    <DataContextProvider>
      <Router router={router} />
    </DataContextProvider>
  </LoginContextProvider>
)
