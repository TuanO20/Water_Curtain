import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCircleCheck, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { auth, provider } from '../../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const [showModalFailed, setShowModalFailed] = useState(false);
    const navigate = useNavigate();

    const handleCloseSuccessModal = () => {
        setShowModalSuccess(false);
        navigate('/dashboard');
    }

    const handleCloseModalFailed = () => {
        setShowModalFailed(false);
    }


    const handleSumbit = (e) => {
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                setShowModalSuccess(true);

            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                setShowModalFailed(true);

            });
    }

    const handleLoginGG = () => {
        signInWithPopup(auth, provider)
            .then((res)=> {
                setShowModalSuccess(true);
            })
            .catch((err) => {
                setShowModalFailed(true);

                console.log(err);
            })
    }

    return (
        <>
            <div className={styles.container}>
                <h3>Login</h3>

                <form onSubmit={handleSumbit}>
                    <div className={styles.username}>
                        <label className={styles.userNameTitle} for='username'>Username</label><br />
                        {!username && <FontAwesomeIcon className={styles.userIcon} icon={faUser} />}
                        <input type='text' placeholder='Type your username' id='username' required onChange={(e) => setUsername(e.target.value)}></input>
                    </div>

                    <div className={styles.password}>
                        <label className={styles.passwordTitle} for='password'>Password</label><br />
                        {!password && <FontAwesomeIcon className={styles.passwordIcon} icon={faLock} />}
                        <input type='password' placeholder='Type your password' id='password' required onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <div className={styles.forgotPass}>
                        <a href='#'>Forgot password?</a>
                    </div>

                    <Button className={styles.normalButton} type='submit'>LOGIN</Button>

                    <div className={styles.ggLogIn}>
                        <div>Or login with</div>
                        <Button className={styles.ggButton} onClick={handleLoginGG}>
                            <FontAwesomeIcon icon={faGoogle} className={styles.ggIcon} />
                            Login with Google
                        </Button>
                    </div>

                    {/*Successful Modal */}
                    <Modal show={showModalSuccess} onHide={handleCloseSuccessModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <FontAwesomeIcon icon={faCircleCheck} style={{color: "#63E6BE", marginRight: "1rem"}} />
                                Login successfully
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>Welcome to your Water Curtain!!!</Modal.Body>

                        <Modal.Footer>
                            <Button variant="success" onClick={handleCloseSuccessModal}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/*Failed Modal */}
                    <Modal show={showModalFailed} onHide={handleCloseModalFailed}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <FontAwesomeIcon icon={faRectangleXmark} style={{color: "#ff0000", marginRight: "1rem"}} />
                                Wrong email or password 
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>Please try again</Modal.Body>

                        <Modal.Footer>
                            <Button variant="danger" onClick={handleCloseModalFailed}>
                                Try again
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </form>
            </div>
        </>
    );
}

export default Login;