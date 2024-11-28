import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import styles from './style.module.scss';

import { ImageProvider } from '../../context/ImageContext';

function DefaultDashBoard() {

    return (
        <>
            <ImageProvider>
                <div className={styles.container}>
                    <Sidebar></Sidebar>
                    <div className={styles.content}>
                        <Header></Header>
                        <div className={styles.main}>
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </ImageProvider>
        </>
    );
}

export default DefaultDashBoard;