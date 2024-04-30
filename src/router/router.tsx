import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Bills from "../pages/Bills"
import Sales from "../pages/Sales"

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/bills",
      element: <Bills />
    },
    {
      path: "/sales",
      element: <Sales />
    }
  ],
  {
    basename: "/"
  }
)

export default router
