import React from 'react';

interface PropsForImageUploader {
    images: FileList | null;
    setImages: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const ImageUploader = ({images,setImages,setIsImageSelected}) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setImages(files);
        setIsImageSelected(true);
    }
    
    return (
        <div>
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