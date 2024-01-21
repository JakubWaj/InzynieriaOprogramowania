import React from 'react';

interface PropsForImageUploader {
    images: FileList | null;
    setImages: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const ImageUploader = ({images,setImages,setIsImageSelected}) => {
    const handleImageChange = async (e) => {
        const files = e.target.files;

        // Przygotuj funkcję do sprawdzania szerokości obrazu
        const checkImageWidth = (file) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    const width = img.width;
                    resolve(width);
                };
                img.onerror = (error) => reject(error);
                img.src = URL.createObjectURL(file);
            });
        };

        // Filtruj obrazy według szerokości
        const filteredImages = [];
        for (const file of files) {
            const width:any = await checkImageWidth(file);
            if (width <= 2400) {
                filteredImages.push(file);
            }
        }

        // Ustaw nową tablicę obrazów
        setImages(filteredImages);

        setIsImageSelected(true);
    };
    
    return (
        <div style={{marginLeft:40+"px",marginBottom:20+"px"}}>
            <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            />
        </div>
    );
};

export default ImageUploader;