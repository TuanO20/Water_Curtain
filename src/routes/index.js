import DefaultDashBoard from "../layout/DefaultDashBoard";
import DefaultHome from "../layout/DefaultHome";
import Draw from "../pages/Draw";
import Login from "../pages/Login";
import Welcome from "../components/Welcome";
import PrivateRoute from "../components/PrivateRoute";
import Guidelines from "../pages/Guidelines";
import Step1 from '../pages/Step1';
import Step2 from '../pages/Step2';
import Step3 from '../pages/Step3';


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
                path: '',
                element: <DefaultDashBoard/>,
                children: [
                    {
                        path: 'draw',
                        element: <Draw/>
                    },
                    {
                        path: 'guidelines',
                        element: <Guidelines/>
                    },
                    {
                        path: 'step1',
                        element: <Step1/>
                    },
                    {
                        path: 'step2',
                        element: <Step2/>
                    },
                    {
                        path: 'step3',
                        element: <Step3/>
                    }
                ]
            },
            
        ]
    }

   
];