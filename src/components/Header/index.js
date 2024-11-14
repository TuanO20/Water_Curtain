import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faUser, faGear, faRightFromBracket, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { auth } from '../../firebase/config';
import { AuthContext } from '../PrivateRoute';

import styles from './style.module.scss';
import Slider from '../Slider';
import clsx from 'clsx';


function Header() {
    const [isShowing, setIsShowing] = useState(false);

    const dataUser = useContext(AuthContext).user;
    console.log(dataUser);

    const handleShowHeaderList = () => {
        setIsShowing(!isShowing);
    }

    const handleLogout = () => {
        auth.signOut();
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.user}>
                    <div className={styles.slider}>
                        <Slider />
                    </div>

                    <div className={styles.userIcon}>
                        {dataUser.photoURL ? <img src={dataUser.photoURL} alt='User Avatar'></img> : <FontAwesomeIcon icon={faCircleUser} size="xl" />}
                    </div>

                    <div className={styles.userName} onClick={handleShowHeaderList}>
                        {dataUser.displayName ? dataUser.displayName : dataUser.email.split('@')[0]}
                    </div>

                    <FontAwesomeIcon icon={faCaretDown} />

                    <div className={clsx(styles.checkList, {
                        [styles.showList]: isShowing
                    })}>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faUser} className={styles.iconHeader}/>
                                Profile
                            </li>

                            <li>
                                <FontAwesomeIcon icon={faGear} className={styles.iconHeader} />
                                Settings
                            </li>

                            <li onClick={handleLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket} className={styles.iconHeader} />
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;