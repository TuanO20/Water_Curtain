import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import styles from './style.module.scss';



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            <div className={styles.container}>
                <h3>Login</h3>

                <form>
                    <div className={styles.username}>
                        <label className={styles.userNameTitle} for='username'>Username</label><br />
                        {!username && <FontAwesomeIcon className={styles.userIcon} icon={faUser} />}
                        <input type='text' placeholder='Type your username' id='username' onChange={(e) => setUsername(e.target.value)}></input>
                    </div>

                    <div className={styles.password}>
                        <label className={styles.passwordTitle} for='password'>Password</label><br />
                        {!password && <FontAwesomeIcon className={styles.passwordIcon} icon={faLock} />}
                        <input type='password' placeholder='Type your password' id='password' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <div className={styles.forgotPass}>
                        <a href='#'>Forgot password?</a>
                    </div>

                    <Button className={styles.normalButton}>LOGIN</Button>

                    <div className={styles.ggLogIn}>
                        <div>Or login with</div>
                        <Button className={styles.ggButton}>
                            <FontAwesomeIcon icon={faGoogle} className={styles.ggIcon} />
                            Login with Google
                        </Button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default Login;