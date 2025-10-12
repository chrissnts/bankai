// React Router
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Home from "./pages/home";
import Clients from "./pages/clients";
import ClientsCreate from "./pages/clients/create";
import ClientsEdit from "./pages/clients/edit";
import Account from "./pages/accounts";
import CreateAccount from "./pages/accounts/create";

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
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/clients/create",
    element: <ClientsCreate />,
  },
  {
    path: "/clients/edit",
    element: <ClientsEdit />,
  },
  {
    path: "/accounts",
    element: <Account />,
  },
  {
    path:'accounts/create',
    element:<CreateAccount/>
  },
  
]);

export default router;
