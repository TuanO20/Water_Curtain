import { useContext, useState } from 'react';
import { ImageContext } from '../../context/ImageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { convertToBlackAndWhite } from '../../utils/imageProcessing';
import ImageComparison from '../../components/ImageComparison';
import styles from './style.module.scss';

function Step2() {
    const { 
        uploadedImages, 
        selectedLibraryImages, 
        drawnImage,
        convertedImages,
        setConvertedImages
    } = useContext(ImageContext);

    const [isConverting, setIsConverting] = useState(false);
    const [valveCount, setValveCount] = useState(100); // Default valve count
    
    const resizeImageForValves = async (imageUrl, valves) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Set width to match valve count and maintain aspect ratio
                canvas.width = valves;
                canvas.height = Math.round((img.height / img.width) * valves);
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.src = imageUrl;
        });
    };

    const handleConvert = async () => {
        setIsConverting(true);
        const converted = [];

        // Convert uploaded images
        for (const image of uploadedImages) {
            const resizedImage = await resizeImageForValves(image.url, valveCount);
            const bwImage = await convertToBlackAndWhite(resizedImage);
            converted.push({
                original: {
                    ...image,
                    url: resizedImage // Update original to use resized version
                },
                bw: bwImage,
                type: 'uploaded',
                name: image.name,
                dimensions: `${valveCount}px width`
            });
        }

        // Convert library images
        for (const image of selectedLibraryImages) {
            const resizedImage = await resizeImageForValves(image.link, valveCount);
            const bwImage = await convertToBlackAndWhite(resizedImage);
            converted.push({
                original: {
                    ...image,
                    link: resizedImage
                },
                bw: bwImage,
                type: 'library',
                name: image.title,
                dimensions: `${valveCount}px width`
            });
        }

        // Convert drawn image if exists
        if (drawnImage) {
            const resizedImage = await resizeImageForValves(drawnImage, valveCount);
            const bwImage = await convertToBlackAndWhite(resizedImage);
            converted.push({
                original: { url: resizedImage },
                bw: bwImage,
                type: 'drawn',
                name: 'Drawn Image',
                dimensions: `${valveCount}px width`
            });
        }

        setConvertedImages(converted);
        setIsConverting(false);
    };

    const totalImages = uploadedImages.length + selectedLibraryImages.length + (drawnImage ? 1 : 0);

    return (
        <Container fluid className="p-5">
            <div className={styles.header}>
                <h2>Convert Images for Water Curtain</h2>
                <div className={styles.controls}>
                    <Form.Group className={styles.valveInput}>
                        <Form.Label>Number of Valves:</Form.Label>
                        <Form.Control
                            type="number"
                            value={valveCount}
                            onChange={(e) => setValveCount(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                            max="1000"
                        />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        onClick={handleConvert}
                        disabled={isConverting || totalImages === 0}
                        className={styles.convertButton}
                    >
                        <FontAwesomeIcon icon={faWandMagicSparkles} className={styles.buttonIcon} />
                        {isConverting ? 'Converting...' : 'Convert into Black & White images'}
                    </Button>
                </div>
            </div>

            <div className={styles.imagesSection}>
                {totalImages === 0 ? (
                    <div className={styles.noImages}>
                        No images selected. Please go back to Step 1 and select some images.
                    </div>
                ) : convertedImages.length === 0 ? (
                    <div className={styles.noConvertedImages}>
                        Click the Convert button to see the water curtain preview
                    </div>
                ) : (
                    <Row className={styles.imageGrid}>
                        {convertedImages.map((image, index) => (
                            <Col xs={12} md={6} key={index} className={styles.imageCol}>
                                <div className={styles.imageCard}>
                                    <ImageComparison
                                        originalImage={image.original}
                                        bwImage={image.bw}
                                        name={image.name}
                                        type={image.type}
                                    />
                                    <div className={styles.imageMeta}>
                                        <span>{image.name}</span>
                                        <span className={styles.dimensions}>{image.dimensions}</span>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </Container>
    );
}

export default Step2;