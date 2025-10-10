// React Router
import { createBrowserRouter, Navigate} from "react-router-dom"
import Login from './pages/login'
import Error from './pages/error'
// import Home from './pages/home'
// import Cursos from './pages/cursos'
// import CursosCreate from './pages/cursos/create'
// import CursosEdit from './pages/cursos/edit'
// import Disciplinas from './pages/disciplinas'
// import DisciplinasCreate from './pages/disciplinas/create'
// import DisciplinasEdit from './pages/disciplinas/edit'


const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login", 
        element: <Login />,
    },
    {
        path: "/error", 
        element: <Error />,
    },
    // { 
    //     path: "/home", 
    //     element: <Home />,
    // },
    // {
    //     path: "/cursos", 
    //     element: <Cursos />,
    // },
    // {
    //     path: "/cursos/create", 
    //     element: <CursosCreate />,
    // },
    // {
    //     path: "/cursos/edit", 
    //     element: <CursosEdit />,
    // },
    // {
    //     path: "/disciplinas", 
    //     element: <Disciplinas />,
    // },
    // {
    //     path: "/disciplinas/create", 
    //     element: <DisciplinasCreate />,
    // },
    // {
    //     path: "/disciplinas/edit", 
    //     element: <DisciplinasEdit />,
    // },
])

export default router