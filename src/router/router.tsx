import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Bills from "../pages/Bills"
import Sales from "../pages/Sales"
import Dates from "../pages/Dates"
import PrivateRoute from "../components/PrivateRoute"

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <PrivateRoute element={<Dashboard />} />
    },
    {
      path: "/bills",
      element: <PrivateRoute element={<Bills />} />
    },
    {
      path: "/sales",
      element: <PrivateRoute element={<Sales />} />
    },
    {
      path: "/dates",
      element: <PrivateRoute element={<Dates />} />
    }
  ],
  {
    basename: "/"
  }
)

export default router
