import styles from './style.module.scss';
import logo from '../../assets/images/drop_logo.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';


function Sidebar() {

    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.logo}>
                    <img src={logo} alt='Logo'/>
                    <div className={styles.logoTitle}>
                        Water Curtain
                    </div>
                </div>

                <div className={styles.sidebarList}>
                    <ul>
                        <NavLink to="/dashboard/guidelines">
                            <li>
                                <FontAwesomeIcon icon={faChalkboardUser} className={styles.sidebarIcon}/>
                                Guidelines
                            </li>
                        </NavLink>

                        <li>
                            1. Import pictures
                        </li>

                        <li>
                            2. Convert bitmap matrix
                        </li>

                        <li>
                            3. Send script
                        </li>
                    </ul>
                </div>

                <div className={styles.social}>
                    <h5>Follow us</h5>
                    <a href='https://www.facebook.com/Google'><FontAwesomeIcon icon={faFacebook} size='lg' className={styles.iconSocial}/></a>
                    <a href='https://www.instagram.com/google/'><FontAwesomeIcon icon={faInstagram} size='lg' className={styles.iconSocial}/></a>
                    <a href='https://twitter.com/Google'><FontAwesomeIcon icon={faXTwitter} size='lg' className={styles.iconSocial}/></a>
                </div>
            </div>
        </>
    );
}

export default Sidebar;