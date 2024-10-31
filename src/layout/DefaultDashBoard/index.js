import { Outlet } from 'react-router-dom';
import './style.module.scss';

function DefaultDashBoard() {

    return (
        <>
            Default DashBoard
            <Outlet/>
        </>
    );
}

export default DefaultDashBoard;