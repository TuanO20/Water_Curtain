import { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedLibraryImages, setSelectedLibraryImages] = useState([]);
    const [drawnImage, setDrawnImage] = useState(null);
    const [convertedImages, setConvertedImages] = useState([]);

    return (
        <ImageContext.Provider
            value={{
                uploadedImages,
                setUploadedImages,
                selectedLibraryImages,
                setSelectedLibraryImages,
                drawnImage,
                setDrawnImage,
                convertedImages,
                setConvertedImages
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};