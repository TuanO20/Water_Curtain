import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faBookBookmark, faPaintBrush, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ImageContext } from '../../context/ImageContext';  // Update path as needed
import styles from './style.module.scss';
import CardImage from '../../components/CardImage';
import DrawingCanvas from '../../components/DrawingCanvas';

// Import your image assets
import Stars from '../../assets/images/stars.jpg';
import Arrows from '../../assets/images/arrows.jpg';
import Diagonals from '../../assets/images/diagonals.jpg';
import UITLogo from '../../assets/images/UITlogo.jpg';
import LeftDiagonal from '../../assets/images/leftDiagonaljpg.jpg';
import RightDiagonal from '../../assets/images/rightDiagonal.jpg';
import Triangle from '../../assets/images/triangle.png';
import X from '../../assets/images/X.png';
import GGDrive from '../../assets/images/GGDrive_Logo.png';

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import clsx from 'clsx';

function Step1() {
    // Get context values and setters
    const { 
        uploadedImages, 
        setUploadedImages,
        selectedLibraryImages,
        setSelectedLibraryImages,
        drawnImage,
        setDrawnImage 
    } = useContext(ImageContext);

    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState({
        PC: false,
        library: false,
        draw: false
    });
    
    // Temporary states for modal selections
    const [tempUploadedFiles, setTempUploadedFiles] = useState([]);
    const [tempSelectedLibraryImages, setTempSelectedLibraryImages] = useState([]);
    
    const libraryImages = [
        { title: "Diagonals", link: Diagonals },
        { title: "Arrows", link: Arrows },
        { title: "Stars", link: Stars },
        { title: "UIT Logo", link: UITLogo },
        { title: "Left Diagonal", link: LeftDiagonal },
        { title: "Right Diagonal", link: RightDiagonal },
        { title: "Triangle", link: Triangle },
        { title: "X Logo", link: X },
        { title: "Google Drive Logo", link: GGDrive }
    ];

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    const handleShowModal = (e) => {
        const nameButton = e.target.textContent;
        if (nameButton.includes("PC")) {
            setShowModal({ ...showModal, PC: true });
            setTempUploadedFiles([]);
        }
        else if (nameButton.includes("library")) {
            setShowModal({ ...showModal, library: true });
            setTempSelectedLibraryImages([]);
        }
        else if (nameButton.includes("Draw")) {
            setShowModal({ ...showModal, draw: true });
        }
    }

    const handleCloseModal = () => {
        setTempUploadedFiles([]);
        setTempSelectedLibraryImages([]);
        
        setShowModal({
            PC: false,
            library: false,
            draw: false
        });
    }

    const handleInputFiles = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setTempUploadedFiles(newImages);
    }

    const handleSubmit = () => {
        if (showModal.PC && tempUploadedFiles.length > 0) {
            setUploadedImages(prev => [...prev, ...tempUploadedFiles]);
        } else if (showModal.library && tempSelectedLibraryImages.length > 0) {
            setSelectedLibraryImages(prev => [...prev, ...tempSelectedLibraryImages]);
        }
        
        handleCloseModal();
    }

    const handleSaveDrawing = (image) => {
        setDrawnImage(image);
        handleCloseModal();
    }

    const handleLibraryImageSelect = (title, link) => {
        setTempSelectedLibraryImages(prev => {
            const imageExists = prev.some(img => img.title === title);
            if (imageExists) {
                return prev.filter(img => img.title !== title);
            } else {
                return [...prev, { title, link }];
            }
        });
    }

    const handleRemoveImage = (index, type) => {
        if (type === 'uploaded') {
            setUploadedImages(prev => prev.filter((_, i) => i !== index));
        } else if (type === 'library') {
            setSelectedLibraryImages(prev => prev.filter((_, i) => i !== index));
        } else if (type === 'drawn') {
            setDrawnImage(null);
        }
    }

    const renderImageGrid = () => {
        return (
            <div className={styles.imageGrid}>
                {uploadedImages.map((image, index) => (
                    <div key={`uploaded-${index}`} className={styles.imageContainer}>
                        <img src={image.url} alt={image.name} className={styles.displayedImage} />
                        <Button 
                            variant="danger" 
                            size="sm" 
                            className={styles.removeButton}
                            onClick={() => handleRemoveImage(index, 'uploaded')}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <span className={styles.imageLabel}>Uploaded: {image.name}</span>
                    </div>
                ))}
                
                {selectedLibraryImages.map((image, index) => (
                    <div key={`library-${index}`} className={styles.imageContainer}>
                        <img src={image.link} alt={image.title} className={styles.displayedImage} />
                        <Button 
                            variant="danger" 
                            size="sm" 
                            className={styles.removeButton}
                            onClick={() => handleRemoveImage(index, 'library')}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <span className={styles.imageLabel}>Library: {image.title}</span>
                    </div>
                ))}
                
                {drawnImage && (
                    <div className={styles.imageContainer}>
                        <img src={drawnImage} alt="Drawn image" className={styles.displayedImage} />
                        <Button 
                            variant="danger" 
                            size="sm" 
                            className={styles.removeButton}
                            onClick={() => handleRemoveImage(0, 'drawn')}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <span className={styles.imageLabel}>Drawn Image</span>
                    </div>
                )}
            </div>
        );
    }

    const renderLibraryCarousel = () => {
        const itemsPerPage = 3;
        const pages = [];
        
        for (let i = 0; i < libraryImages.length; i += itemsPerPage) {
            const pageImages = libraryImages.slice(i, i + itemsPerPage);
            pages.push(
                <Carousel.Item key={i}>
                    <Container>
                        <Row className="w-100">
                            <Col style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                                {pageImages.map((image) => (
                                    <CardImage 
                                        key={image.title}
                                        title={image.title} 
                                        link={image.link}
                                        onClick={() => handleLibraryImageSelect(image.title, image.link)}
                                        isSelected={tempSelectedLibraryImages.some(img => img.title === image.title)}
                                    />
                                ))}
                            </Col>
                        </Row>
                    </Container>
                </Carousel.Item>
            );
        }
        
        return pages;
    }

    return (
        <div className={clsx(styles.container, "p-5")}>
            <div className={styles.importButtons}>
                <Button variant="secondary" className={styles.buttonImport} onClick={handleShowModal}>
                    <FontAwesomeIcon icon={faFileImport} className={styles.buttonIcon} />
                    Upload from PC
                </Button>
                <Button variant="secondary" className={styles.buttonImport} onClick={handleShowModal}>
                    <FontAwesomeIcon icon={faBookBookmark} className={styles.buttonIcon} />
                    Select from library
                </Button>
                <Button variant="secondary" className={styles.buttonImport} onClick={handleShowModal}>
                    <FontAwesomeIcon icon={faPaintBrush} className={styles.buttonIcon} />
                    Draw images and type text
                </Button>
            </div>

            <div className={styles.modal}>
                {/* Upload from PC Modal */}
                <Modal show={showModal.PC} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FontAwesomeIcon icon={faFileImport} style={{color: "#63E6BE", margin: "0 1rem 0 0.2rem"}} />
                            Upload from PC
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input 
                            type="file" 
                            required 
                            multiple 
                            accept='image/*' 
                            onChange={handleInputFiles}
                        />
                        {tempUploadedFiles.length > 0 && (
                            <div className={styles.previewText}>
                                {tempUploadedFiles.length} file(s) selected
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="success" 
                            onClick={handleSubmit}
                            disabled={tempUploadedFiles.length === 0}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Select from library Modal */}
                <Modal show={showModal.library} onHide={handleCloseModal} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FontAwesomeIcon icon={faBookBookmark} style={{color: "#74C0FC", margin: "0 1rem 0 0.2rem"}} />
                            Select from library
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            {renderLibraryCarousel()}
                        </Carousel>
                        {tempSelectedLibraryImages.length > 0 && (
                            <div className={styles.previewText}>
                                {tempSelectedLibraryImages.length} image(s) selected
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="success" 
                            onClick={handleSubmit}
                            disabled={tempSelectedLibraryImages.length === 0}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Draw images Modal */}
                <Modal show={showModal.draw} onHide={handleCloseModal} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FontAwesomeIcon icon={faPaintBrush} style={{color: "#FF922B", margin: "0 1rem 0 0.2rem"}} />
                            Draw image and type text
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DrawingCanvas width={600} height={400} onSave={handleSaveDrawing} />
                    </Modal.Body>
                </Modal>
            </div>

            <div>
                {renderImageGrid()}
            </div>
        </div>
    );
}

export default Step1;