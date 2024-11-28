import React, { useContext, useState } from 'react';
import { ImageContext } from '../../context/ImageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ref, set } from 'firebase/database';
import { database } from '../../firebase/config';
import styles from './style.module.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import clsx from 'clsx';

function Step3() {
    const { convertedImages } = useContext(ImageContext);
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleSendToFirebase = async () => {
        setIsSending(true);
        setError(null);
        setShowSuccess(false);
        setShowConfirmModal(false);

        try {
            const imagesRef = ref(database, 'Images');
            
            // Prepare the data to send
            var imageData = {};
            convertedImages.forEach((image, index) => {
                imageData["Img" + index] = image.bw;
            });

            // Send to Firebase
            await set(imagesRef, imageData);
            setShowSuccess(true);

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSending(false);
        }
    };

    const renderImageGrid = () => {
        return (
            <div className={styles.imageGrid}>
                {convertedImages.map((image, index) => (
                    <div key={`converted-${index}`} className={styles.imageContainer}>
                        <img src={image.bw} alt={image.name} className={styles.displayedImage} />
                        <span className={styles.imageLabel}>
                            {image.name}
                            <br />
                            <small>{image.dimensions}</small>
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={clsx(styles.container, "p-5")}>
            {error && (
                <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}

            {showSuccess && (
                <Alert variant="success" className="mb-4" onClose={() => setShowSuccess(false)} dismissible>
                    Images successfully sent to the water curtain system!
                </Alert>
            )}

            <div>
                {renderImageGrid()}
            </div>

            <div className={styles.sendButton}>
                <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => setShowConfirmModal(true)}
                    disabled={isSending || convertedImages.length === 0}
                >
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.buttonIcon} />
                    Send
                </Button>
            </div>

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faPaperPlane} style={{color: "#63E6BE", margin: "0 1rem 0 0.2rem"}} />
                        Confirm Send
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to send {convertedImages.length} image(s) to the water curtain system?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="success" 
                        onClick={handleSendToFirebase}
                        disabled={isSending}
                    >
                        {isSending ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Sending...
                            </>
                        ) : (
                            'Confirm Send'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Step3;