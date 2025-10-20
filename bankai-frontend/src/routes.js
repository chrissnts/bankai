// React Router
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Home from "./pages/home";
import HomeCreate from "./pages/home/create";
import HomeEdit from "./pages/home/edit";
import Account from "./pages/accounts";
import CreateAccount from "./pages/accounts/create";
import ClientBalance from "./pages/client/balance";

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
    path: "/home/create",
    element: <HomeCreate />
  },
  {
    path: "/home/edit",
    element: <HomeEdit />
  },
  {
    path: "client/balance",
    element: <ClientBalance />
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
