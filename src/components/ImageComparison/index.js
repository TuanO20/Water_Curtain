import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './style.module.scss';
import clsx from 'clsx';

const ImageComparison = ({ originalImage, bwImage, name, type }) => {
    return (
        <Row className={clsx(styles.fixedHeight,"mb-4 align-items-center p-4")}>
            <Col md={6}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img 
                        src={type === 'library' ? originalImage.link : originalImage.url} 
                        alt={`Original ${name}`}
                        className="mb-2 me-2"
                    />
                    <div className={styles.imageLabel}>Original: {name}</div>
                </div>
            </Col>
            <Col md={6}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img 
                        src={bwImage} 
                        alt={`B&W ${name}`}
                        className="mb-2 me-2"
                    />
                    <div className={styles.imageLabel}>B&W: {name}</div>
                </div>
            </Col>
        </Row>
    );
};

export default ImageComparison;