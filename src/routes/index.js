import DefaultDashBoard from "../layout/DefaultDashBoard";
import DefaultHome from "../layout/DefaultHome";
import Draw from "../pages/Draw";
import Login from "../pages/Login";
import Welcome from "../components/Welcome";
import PrivateRoute from "../components/PrivateRoute";

export const routes = [
    {
        path: '/',
        element: <DefaultHome/>,
        children: [
            {
                index: true,
                element: <Welcome/>
            },
            {
                path: 'login',
                element: <Login/>
            }
        ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <DefaultDashBoard/>
            },
            {
                path: 'draw',
                element: <Draw/>
            },
            {
                path: 'guidelines',
                element: <Draw/>
            }
        ]
    }

   
];