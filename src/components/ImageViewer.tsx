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

    useEffect(() => {
        console.log(images.length)
        setLength(images.length)
    }, [images]);
    
    const [length,setLength] = useState<number>(0)
    const [counter,setCounter] = useState<number>(0)
    const [counter2,setCounter2] = useState<number>(0)
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
    
    const [yes,setYes] = useState<boolean>(false)
    const handleYes = (e) => {
        e.preventDefault()
        setYes(!yes)
        setCounter2(2);
    }
    
    return (
        <>
        { !yes && <>
            <p style={{marginLeft:40+"px"}}>Czy chcesz zaimportowac dane z jsona?</p>
            <ImportButton setYes={setYes} setData={setData} ></ImportButton>
            <form onSubmit={handleYes}>
                <button style={{marginLeft:40+"px"}}>Nie</button>
            </form>
            </>}
            {yes && <div style={{marginLeft:40}}>
            {imagesUrl.map((image, index) => (
                <Image length={length} counter2={counter2} setCounter2={setCounter2} counter={counter} setCounter={setCounter} setCategories={setCategories} data={data} chosenCategory={chosenCategory} coco={coco} setCoco={setCoco} setChosenCategory={setChosenCategory} categories={categories} index={index} key={index} image={images[index]} imageUrl={image}/>
            ))}
        </div>}
        </>
    );
}
export default ImageViewer;