import styles from './style.module.scss';
import Card from 'react-bootstrap/Card';
import clsx from 'clsx';

function CardImage({ title, link, onClick, isSelected }) {
    return (
        <Card 
            onClick={onClick} 
            className={clsx(styles.card, { [styles.activeCard]: isSelected })} 
            style={{ width: '18rem', height: "10rem", margin: "0 2rem", cursor: 'pointer' }}
        >
            <Card.Img 
                variant="top" 
                src={link} 
                style={{
                    width: "100%", 
                    height: "4.5rem", 
                    objectFit: "contain"
                }}
            />
            <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>{title}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default CardImage;