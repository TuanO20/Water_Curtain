import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import styles from './style.module.scss';

function DefaultDashBoard() {

    return (
        <>
            <div className={styles.container}>
                <Sidebar></Sidebar>
                <div className={styles.content}>
                    <Header></Header>
                    <div className={styles.main}>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DefaultDashBoard;