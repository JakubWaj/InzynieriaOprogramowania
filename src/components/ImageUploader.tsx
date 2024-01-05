import React from 'react';

interface PropsForImageUploader {
    images: FileList | null;
    setImages: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const ImageUploader = ({images,setImages}) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setImages(files);
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