import React, {useEffect, useState} from 'react';
import Form from "./Form.tsx";
import Info from "./Info.tsx";
import DrawableImage from "./DrawableImage.tsx";

const Image = ({length,setCounter2,counter2,counter,setCounter,data,coco,chosenCategory,setCoco,setChosenCategory,categories,setCategories,imageUrl,index,image}) => {
    
    const [annotations,setAnnotations] = useState<any[]>([])
    const [imgTags,setImgTags] = useState<{key:string,value:string}[]>([])
    useEffect(() => {
        if (data.length===0) return
        const xd = data.images.filter((imagez)=>imagez.file_name===image.name)[0]
        if (xd === undefined) return
        const id = data.images.filter((imagez)=>imagez.file_name===image.name)[0].id
        var annotationsz = data.annotations.filter((annotation)=>annotation.image_id===id)
        let tab = []
        annotationsz.map((annotation)=>{
            let x = {coordinate:{x1:annotation.bbox[0][0],y1:annotation.bbox[0][1],x2:annotation.bbox[1][0],x3:annotation.bbox[2][0],x4:annotation.bbox[3][0],y2:annotation.bbox[1][1],y3:annotation.bbox[2][1],y4:annotation.bbox[3][1]},category : data.categories[annotation.category_id-1].name}
            annotations.push(x)
            /*     
            setAnnotations([...annotations,{
                coordinate:{x1:annotation.bbox[0][0],y1:annotation.bbox[0][1],x2:annotation.bbox[1][0],x3:annotation.bbox[2][0],x4:annotation.bbox[3][0],y2:annotation.bbox[1][1],y3:annotation.bbox[2][1],y4:annotation.bbox[3][1]},
                category:data.categories[annotation.category_id-1].name
            }]) */
        })
        const tags = data.images.filter((imagez)=>imagez.file_name===image.name)[0].tags
        console.log(tags)
        console.log(annotations)
        setImgTags(tags)
    },[data]);
    
    
    
    return (
        <div style={{position:"relative"}}>
            {counter===index && <DrawableImage length={length} setCounter2={setCounter2} counter2={counter2} counter={counter} setCounter={setCounter} data={data} tagss={imgTags} annotationss={annotations} coco={coco} chosenCategory={chosenCategory} setCoco={setCoco} setChosenCategory={setChosenCategory} categories={categories} image={image} imageUrl={imageUrl} index={index}/>}
        </div>
    );
};

export default Image;