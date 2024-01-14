import React, {useState} from 'react';
import Form from "./Form.tsx";
import Info from "./Info.tsx";
import DrawableImage from "./DrawableImage.tsx";

const Image = ({coco,chosenCategory,setCoco,setChosenCategory,categories,imageUrl,index,image}) => {
    return (
        <div style={{position:"relative"}}>
            <DrawableImage coco={coco} chosenCategory={chosenCategory} setCoco={setCoco} setChosenCategory={setChosenCategory} categories={categories} image={image} imageUrl={imageUrl} index={index}/>
        </div>
    );
};

export default Image;