import React, { useState,useEffect } from 'react'
import './App.css'
import ImageUploader from "./components/ImageUploader.tsx";
import ImageViewer from "./components/ImageViewer.tsx";
import DatasetName from "./components/DatasetName.tsx";
import Categories from "./components/Categories.tsx";
import Category from "./components/Category.tsx";
import ButtonCoco from "./components/ButtonCoco.tsx";
import logo from './assets/logo.png';
import CategoryList from "./components/CategoryList.tsx";
import ImportButton from "./components/ImportButton.tsx";
function App() {
    
  const [coco, setCoco] = useState<
      {
          id:number,
          width:number,
          height:number,
          file_name:string,
          category_name:string,
          tags:{key:string,value:string}[],
          position:{coordinate:{x1:number;y1:number;x2:number;y2:number;x3:number;y3:number;x4:number;y4:number;},category:string}[]
      }[]>([]);
  const [setted, setSetted] = useState<boolean>(true);
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

    function calculateArea(x1, y1, x2, y2, x3, y3, x4, y4) {
        const base1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const base2 = Math.sqrt(Math.pow(x4 - x3, 2) + Math.pow(y4 - y3, 2));
        const height = Math.abs(y2 - y1);

        const area = 0.5 * (base1 + base2) * height;
        return area;
    }
    
    const handleJson= ()=>{
        let uniqueid = 1;
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
        const objectAnnotations = coco.flatMap((image) => {
            return image.position.map((pos) => {
                return {
                    id: uniqueid++,
                    image_id: image.id,
                    category_id: categories.indexOf(pos.category) + 1 === 0 ? 1 : categories.indexOf(pos.category) + 1,
                    bbox: [
                        [pos.coordinate.x1, pos.coordinate.y1],
                        [pos.coordinate.x2, pos.coordinate.y2],
                        [pos.coordinate.x3, pos.coordinate.y3],
                        [pos.coordinate.x4, pos.coordinate.y4],
                    ],
                    area: calculateArea(pos.coordinate.x1, pos.coordinate.y1, pos.coordinate.x2, pos.coordinate.y2, pos.coordinate.x3, pos.coordinate.y3, pos.coordinate.x4, pos.coordinate.y4),
                };
            });
        });

        object.annotations = objectAnnotations;
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
    const handleEntry=(e)=>{
        e.preventDefault();
        setSetted(false)
    }
  return (
    <div className="App">
        {/*<img src={logo} alt="logo" style={{top:0,right:0,height:"auto",position:"fixed"}}></img>*/}
        { setted && <>
        <DatasetName handleDatasetName={handleDatasetName} setName={setName} name={name}></DatasetName>
         <Categories handleCategory={handleCategory} category={category} setCategory={setCategory}></Categories>
            <CategoryList categories={categories}></CategoryList>
    <form onSubmit={handleEntry}>
            <button style={{marginLeft:40+"px"}} disabled={name.trim().length === 0 || categories.length===0}>Dalej</button>
        </form></>}
        { !setted&& <>
        {!isImageSelected && <ImageUploader setIsImageSelected={setIsImageSelected} images={selectedImages}  setImages={setSelectedImages} />}
        {selectedImages.length > 0 && 
      <ImageViewer setCategories={setCategories} coco={coco} chosenCategory={chosenCategory} setCoco={setCoco} setChosenCategory={setChosenCategory}  categories={categories} images={selectedImages} imagesUrl={selectedImagesURL}/>}
        <ButtonCoco exportToCoco={exportToCoco}></ButtonCoco>
        </>}
    </div>
  )
}

export default App
