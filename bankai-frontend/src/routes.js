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
import ClientTransfer from "./pages/client/transfer";
import ClientSaving from "./pages/client/savings";
import ClientStatement from "./pages/client/statement";
import AccountEdit from "./pages/accounts/edit";

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
    path: "/client/transfer",
    element: <ClientTransfer />
  },
  {
    path: "/client/savings",
    element: <ClientSaving />
  },
  {
    path: "/client/statement",
    element: <ClientStatement />
  },
  {
    path: "/accounts",
    element: <Account />,
  },
  {
    path:'accounts/create',
    element:<CreateAccount/>
  },
  {
    path: "/accounts/edit",
    element: <AccountEdit />
  },
 
  
]);

export default router;
