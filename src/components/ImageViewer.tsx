import React, {useEffect, useState} from 'react';
import Image from "./Image.tsx";
import ImportButton from "./ImportButton.tsx";

interface PropsForImageViewer {
    images: FileList | null;
}

const ImageViewer = ({coco,chosenCategory,setCoco,setChosenCategory,categories,setCategories,images,imagesUrl}) => {
    const handleFiles = ()=>{
        for(let i =0;i<images.length;i++) {
            const file = images[i];
            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    }

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }
    const [data,setData] = useState<any>([]);
    useEffect(() => {
        if (data.length===0) return
        let tab = []
        data.categories.map((category)=>{
            tab.push(category.name)
        })
        const XDDX = [...new Set([...tab, ...categories])];
        console.log("XDDX")
        console.log(XDDX)
        console.log("XDDX")
        setCategories(XDDX)
    }, [data]);
    
    return (
        <>
            <ImportButton setData={setData} ></ImportButton>
        <div>
            {imagesUrl.map((image, index) => (
                <Image setCategories={setCategories} data={data} chosenCategory={chosenCategory} coco={coco} setCoco={setCoco} setChosenCategory={setChosenCategory} categories={categories} index={index} key={index} image={images[index]} imageUrl={image}/>
            ))}
        </div>
        </>
    );
}
export default ImageViewer;