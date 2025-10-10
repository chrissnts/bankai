// React Router
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Home from "./pages/home";
import Clientes from "./pages/clientes";
import ClientesCreate from "./pages/clientes/create";
// import ClientesEdit from './pages/clientes/edit'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/clietes",
    element: <Clientes />,
  },
  {
    path: "/clientes/create",
    element: <ClientesCreate />,
  },
//   {
//       path: "/clientes/edit",
//     element: <ClientesEdit />,
//   },

]);

export default router;
