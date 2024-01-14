import React, { useState,useEffect } from 'react'
import './App.css'
import ImageUploader from "./components/ImageUploader.tsx";
import ImageViewer from "./components/ImageViewer.tsx";
import DatasetName from "./components/DatasetName.tsx";
import Categories from "./components/Categories.tsx";
import Category from "./components/Category.tsx";
import ButtonCoco from "./components/ButtonCoco.tsx";
import logo from './assets/logo.png';
function App() {
    
  const [coco, setCoco] = useState<
      {
          id:number,
          width:number,
          height:number,
          file_name:string,
          category_name:string,
          tags:{key:string,value:string}[],
          position:
              {
                  x1:number,
                  y1:number,
                  x2:number,
                  y2:number,
                  x3:number,
                  y3:number,
                  x4:number,
                  y4:number
              }
      }[]>([]);
  const [nameSetted, setNameSetted] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [selectedImagesURL, setSelectedImagesURL] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [categories,setCategories] = useState<string[]>([]);
  const [category,setCategory] = useState<string>('');
  const [chosenCategory,setChosenCategory] = useState<string[]>([]);
  const [isImageSelected,setIsImageSelected] = useState<boolean>(false);

    const handleCategory =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (category === '')
            return
        if (categories.includes(category))
            return
        setCategories([...categories,category]);
        setCategory('')
    }
    
    useEffect(() => {
        if (selectedImages) {
            const newImages: string[] = [];
            
            Array.from(selectedImages).forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    newImages.push(reader.result as string);
                    if (newImages.length === selectedImages.length) {
                        setSelectedImagesURL(newImages);
                    }
                };
                console.log(newImages);
                reader.readAsDataURL(file);
            });
        }
    }, [selectedImages]);
    
    const handleJson= ()=>{
        const object ={
            info : {
                description: name,
                url: "https://example.com",
                version: "1.0",
                date_created: Date.now()
            },
            licenses: [
                {
                }
            ],
            images: [
                {}],
            annotations: [
                {}],
            categories: [
                {}]
        }
        object.images = coco.map((image)=>{
            return {
                id:image.id,
                width:image.width,
                height:image.height,
                file_name:image.file_name,
                tags:image.tags
            }
        })
        object.annotations = coco.map((image)=>{
            return {
                id:image.id,
                image_id:image.id,
                category_id:categories.indexOf(image.category_name)+1==0 ? 1 : categories.indexOf(image.category_name)+1,
                segmentation:[[image.position.x1,image.position.y1],[image.position.x2,image.position.y2],[image.position.x3,image.position.y3],[image.position.x4,image.position.y4]],
                area:0,
                bbox:[0,0,0,0],
                iscrowd:0
            }
        })
        object.categories = categories.map((category,index)=>{
            return {
                id:index+1,
                name:category,
                supercategory:category
            }
        })
        console.log(object)
        return object
    }
    
    const exportToCoco = (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        if (name === '')
            return
        const obj = handleJson()
        console.log(obj)
        const jsonContent = JSON.stringify(obj, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'coco_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        window.location.reload();
    }
    const handleDatasetName = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name)
        setNameSetted(true)
    }
  return (
    <div className="App">
        <img src={logo} alt="logo" style={{top:0,right:0,height:"auto",position:"fixed"}}></img>
        <DatasetName handleDatasetName={handleDatasetName} setName={setName} name={name}></DatasetName>
         <Categories handleCategory={handleCategory} category={category} setCategory={setCategory}></Categories>
        {!isImageSelected && <ImageUploader setIsImageSelected={setIsImageSelected} images={selectedImages}  setImages={setSelectedImages} />}
        {selectedImages.length > 0 && 
      <ImageViewer coco={coco} chosenCategory={chosenCategory} setCoco={setCoco} setChosenCategory={setChosenCategory}  categories={categories} images={selectedImages} imagesUrl={selectedImagesURL}/>}
        <ButtonCoco exportToCoco={exportToCoco}></ButtonCoco>
    </div>
  )
}

export default App
