import React from 'react';
import Image from "./Image.tsx";

interface PropsForImageViewer {
    images: FileList | null;
}

const ImageViewer = ({coco,chosenCategory,setCoco,setChosenCategory,categories,images,imagesUrl}) => {
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
                <Image chosenCategory={chosenCategory} coco={coco} setCoco={setCoco} setChosenCategory={setChosenCategory} categories={categories} index={index} key={index} image={images[index]} imageUrl={image}/>
            ))}
        </div>
    );
}
export default ImageViewer;