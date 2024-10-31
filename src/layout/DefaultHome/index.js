import { Outlet } from 'react-router-dom';
import styles from './style.module.scss';


function DefaultHome() {

    return (
        <>
            <div className={styles.background}>
                <Outlet/>
            </div>
            
        </>
    );
}

export default DefaultHome;