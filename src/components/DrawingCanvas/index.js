import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button, Form, ButtonGroup, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSquare, faCircle, faEraser, faTrash, faFont } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.scss';

const DrawingCanvas = ({ width, height, onSave }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(1);
    const [tool, setTool] = useState('pencil');
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [eraserSize, setEraserSize] = useState(20);
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(16);
    const [textPosition, setTextPosition] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = tool === 'eraser' ? eraserSize : lineWidth;
        
        // Reset composite operation when tool changes
        context.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
        
        if (tool === 'text') {
            context.font = `${fontSize}px Arial`;
            context.fillStyle = color;
        }
    }, [color, lineWidth, tool, eraserSize, fontSize]);

    const handleWheel = useCallback((e) => {
        if (tool === 'eraser' && e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -5 : 5;
            setEraserSize(prev => Math.max(10, Math.min(100, prev + delta)));
        }
    }, [tool]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.addEventListener('wheel', handleWheel, { passive: false });
        return () => canvas.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    const startDrawing = useCallback((e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (tool === 'text') {
            setTextPosition({ x: offsetX, y: offsetY });
            return;
        }
        setIsDrawing(true);
        setStartPos({ x: offsetX, y: offsetY });
        const context = canvasRef.current.getContext('2d');
        context.beginPath();
        context.moveTo(offsetX, offsetY);
    }, [tool]);

    const draw = useCallback((e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const context = canvasRef.current.getContext('2d');

        switch (tool) {
            case 'pencil':
            case 'eraser':
                context.lineTo(offsetX, offsetY);
                context.stroke();
                break;
            case 'rectangle':
            case 'circle':
                drawShape(context, tool, offsetX, offsetY);
                break;
            default:
                break;
        }
    }, [isDrawing, tool]);

    const drawShape = (context, type, endX, endY) => {
        const canvas = canvasRef.current;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempContext = tempCanvas.getContext('2d');

        tempContext.drawImage(canvas, 0, 0);
        tempContext.beginPath();
        tempContext.fillStyle = color;
        tempContext.strokeStyle = color;
        tempContext.lineWidth = lineWidth;

        if (type === 'rectangle') {
            tempContext.rect(startPos.x, startPos.y, endX - startPos.x, endY - startPos.y);
        } else if (type === 'circle') {
            const radius = Math.sqrt(Math.pow(endX - startPos.x, 2) + Math.pow(endY - startPos.y, 2));
            tempContext.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        }

        tempContext.fill();
        tempContext.stroke();
        context.drawImage(tempCanvas, 0, 0);
    };

    const handleTextSubmit = useCallback(() => {
        if (!textPosition || !text) return;
        
        const context = canvasRef.current.getContext('2d');
        // Ensure we're in normal drawing mode for text
        context.globalCompositeOperation = 'source-over';
        context.font = `${fontSize}px Arial`;
        context.fillStyle = color;
        context.fillText(text, textPosition.x, textPosition.y);
        
        setText('');
        setTextPosition(null);
    }, [text, textPosition, fontSize, color]);

    const stopDrawing = useCallback(() => {
        setIsDrawing(false);
        const context = canvasRef.current.getContext('2d');
        context.beginPath();
    }, []);

    const handleClear = useCallback(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }, []);

    const getEraserCursor = () => {
        if (tool !== 'eraser') return tool === 'text' ? 'text' : 'default';
        const circle = `
      <svg width="${eraserSize}" height="${eraserSize}" viewBox="0 0 ${eraserSize} ${eraserSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${eraserSize / 2}" cy="${eraserSize / 2}" r="${eraserSize / 2 - 1}" fill="none" stroke="black"/>
      </svg>
    `;
        const encoded = window.btoa(circle);
        return `url(data:image/svg+xml;base64,${encoded}) ${eraserSize / 2} ${eraserSize / 2}, auto`;
    };

    return (
        <div className={styles.drawingContainer}>
            {/* Rest of your JSX remains exactly the same */}
            <div className={styles.controlsContainer}>
                <div className={styles.toolsSection}>
                    <ButtonGroup>
                        <Button
                            variant={tool === 'pencil' ? 'primary' : 'outline-primary'}
                            onClick={() => setTool('pencil')}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button
                            variant={tool === 'rectangle' ? 'primary' : 'outline-primary'}
                            onClick={() => setTool('rectangle')}
                        >
                            <FontAwesomeIcon icon={faSquare} />
                        </Button>
                        <Button
                            variant={tool === 'circle' ? 'primary' : 'outline-primary'}
                            onClick={() => setTool('circle')}
                        >
                            <FontAwesomeIcon icon={faCircle} />
                        </Button>
                        <Button
                            variant={tool === 'eraser' ? 'primary' : 'outline-primary'}
                            onClick={() => setTool('eraser')}
                        >
                            <FontAwesomeIcon icon={faEraser} />
                        </Button>
                        <Button
                            variant={tool === 'text' ? 'primary' : 'outline-primary'}
                            onClick={() => setTool('text')}
                        >
                            <FontAwesomeIcon icon={faFont} />
                        </Button>
                        <Button variant="outline-secondary" onClick={handleClear}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </ButtonGroup>

                    <Form.Group controlId="colorPicker" className={styles.colorPicker}>
                        <Form.Control
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            title="Choose color"
                        />
                    </Form.Group>
                </div>

                <div className={styles.lineWidthSection}>
                    <Form.Group controlId="lineWidth">
                        <Form.Select
                            value={lineWidth}
                            onChange={(e) => setLineWidth(Number(e.target.value))}
                            className={styles.lineWidthSelect}
                        >
                            <option value="1">1px</option>
                            <option value="3">3px</option>
                            <option value="5">5px</option>
                            <option value="8">8px</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            </div>

            {tool === 'text' && (
                <div className={styles.textInputSection}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Enter text..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Form.Select
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className={styles.fontSizeSelect}
                        >
                            <option value="12">12px</option>
                            <option value="16">16px</option>
                            <option value="20">20px</option>
                            <option value="24">24px</option>
                            <option value="32">32px</option>
                        </Form.Select>
                        <Button 
                            variant="outline-secondary"
                            onClick={handleTextSubmit}
                            disabled={!text || !textPosition}
                        >
                            Add Text
                        </Button>
                    </InputGroup>
                </div>
            )}

            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                className={styles.canvas}
                style={{
                    cursor: getEraserCursor(),
                }}
            />

            <div className={styles.submitButton}>
                <Button variant="success" onClick={() => onSave(canvasRef.current.toDataURL('image/png'))}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default DrawingCanvas;