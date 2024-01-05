import React from 'react';
import Image from "./Image.tsx";

interface PropsForImageViewer {
    images: FileList | null;
}

const ImageViewer = ({images,imagesUrl,handleDelete,handleSubmit}) => {
    const handleFiles = ()=>{
        for(let i =0;i<images.length;i++) {
            const file = images[i];
            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    }
    return (
        <div>
            {imagesUrl.map((image, index) => (
                <Image index={index} key={index} image={images[index]} imageUrl={image} handleDelete={handleDelete} handleSubmit={handleSubmit} />
            ))}
        </div>
    );
}
export default ImageViewer;