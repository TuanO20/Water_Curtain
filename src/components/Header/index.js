import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faUser, faGear, faRightFromBracket, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from './style.module.scss';
import Slider from '../Slider';
import clsx from 'clsx';



function Header() {
    const [isShowing, setIsShowing] = useState(false);

    const handleShowHeaderList = () => {
        setIsShowing(!isShowing);
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.user}>
                    <div className={styles.slider}>
                        <Slider />
                    </div>

                    <div className={styles.userIcon}>
                        <FontAwesomeIcon icon={faCircleUser} size="xl" />
                    </div>

                    <div className={styles.userName} onClick={handleShowHeaderList}>
                        Trần Anh Tuấn

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

                            <li>
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