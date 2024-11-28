import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faTh, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './style.module.scss';

const Guidelines = () => {
    const steps = [
        {
            title: 'Import Pictures',
            description: 'Upload your images to the website.',
            icon: <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />,
        },
        {
            title: 'Convert Images',
            description: 'Transform your images into bitmap matrix format.',
            icon: <FontAwesomeIcon icon={faTh} size="3x" />,
        },
        {
            title: 'Send Scripts',
            description: 'Send the generated scripts to your Raspberry Pi.',
            icon: <FontAwesomeIcon icon={faPaperPlane} size="3x" />,
        },
    ];

    return (
        <Container className="guidelines-container p-5 ">
            <h3 className="text-center mb-5">How to Use Our Website</h3>
            <Row>
                {steps.map((step, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card className="h-100 step-card">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <div className="icon-wrapper mb-3">
                                    {step.icon}
                                </div>
                                <Card.Title className="text-center mb-3">Step {index + 1}: {step.title}</Card.Title>
                                <Card.Text className="text-center">{step.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Guidelines;

