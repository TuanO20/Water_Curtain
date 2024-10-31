import DefaultDashBoard from "../layout/DefaultDashBoard";
import DefaultHome from "../layout/DefaultHome";
import Draw from "../pages/Draw";
import Login from "../pages/Login";
import Welcome from "../components/Welcome";


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
        element: <DefaultDashBoard/>,
        children: [
            {
                path: 'draw',
                element: <Draw/>
            }
        ]
    }
];