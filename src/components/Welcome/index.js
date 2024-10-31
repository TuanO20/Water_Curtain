import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/images/logo.png";
import Clock from "../Clock";
import styles from './style.module.scss';
import Button from 'react-bootstrap/Button';

function Welcome() {
    return (
        <div className={styles.container}>
            <div style={{textAlign: "center"}}>Welcome to your Water Curtain!!!</div>
            <Clock></Clock>
            <img src={logo} alt="logo"></img>  
            <Link to="/login">
            <Button variant="success">Go to login page</Button>{''}
            </Link>
        </div>

    );
}

export default Welcome;