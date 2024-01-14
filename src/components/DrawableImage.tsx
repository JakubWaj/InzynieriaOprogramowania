import React, { useRef, useState, useEffect } from "react";
import Form from "./Form.tsx";
import {Tags} from "exifreader";
import * as ExifReader from "exifreader";
import Category from "./Category.tsx";

const DrawableImage = ({coco,chosenCategory,setCoco,categories,setChosenCategory,image,imageUrl,index})=> {
    console.log(chosenCategory)
    const [coordinatess,setCoordinatess] = useState<{ x: number; y: number }[]>([]);
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (i<4){
            return
        }
        if (categories.length===0)
            return;
        if (chosenCategory === '')
            return
        const newCoco = {
            id:index,
            width:tags['Image Width'].value,
            height:tags['Image Height'].value,
            file_name:image.name,
            category_name:chosenCategory,
            tags:imgTags,
            position: {
                x1:coordinates[0][0],
                y1:coordinates[0][1],
                x2:coordinates[1][0],
                y2:coordinates[1][1],
                x3:coordinates[2][0],
                y3:coordinates[2][1],
                x4:coordinates[3][0],
                y4:coordinates[3][1]
            }
        }
        console.log(newCoco)
        setCoco([...coco,newCoco])
        setSubmit(true)
    }
    const [i,setI] = useState(0);
    const [coordinates,setCoordinates] = useState([[0,0],[0,0],[0,0],[0,0]]);
    const [tags, setTags] = useState<Tags>()
    const [clicked, setClicked] = useState<boolean>(false)
    const [xd,setXd] = useState<number>(0)
    const [submit,setSubmit] = useState<boolean>(false)
    const [isSelected,setIsSelected] = useState<boolean>(false)
    
    const [imgTags,setImgTags] = useState<{key:string,value:string}[]>([])
    const [key,setKey] = useState<string>('')
    const [value,setValue] = useState<string>('')
    const addTag = (e)=> {
        e.preventDefault()
        if (key === '')
            return
        if (value === '')
            return
        setImgTags([...imgTags,{key:key,value:value}])
    }
    
    useEffect(()=>{
            const fetchTags = async () => {
                const tags = await ExifReader.load(image, {async: true});
                setTags(tags);
                setClicked(true)
                setXd(tags['Image Height'].value+35)
            }
            (async ()=>{await fetchTags()})();
        }
    ,[])
    const test = ()=>{
        console.log(tags['Image Height'].value)
        if (i<4) {
            // @ts-ignore
            console.log(event.offsetX);
            // @ts-ignore
            console.log(event.offsetY);
            // @ts-ignore
            if (event.offsetX>tags['Image Width'].value || event.offsetY>tags['Image Height'].value) {
                console.log("nie")
                return
            }
            // @ts-ignore
            coordinates[i][0] = event.offsetX;
            // @ts-ignore
            coordinates[i][1] = event.offsetY;
            setI(i+1);
        }
    }
    const imageRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [rectanglePoints, setRectanglePoints] = useState<{ x: number; y: number }[]>(
        []
    );

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            setContext(ctx);
        }
    }, []);

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = event;
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = clientX - (rect?.left || 0);
        const y = clientY - (rect?.top || 0);
        setCoordinatess((prevPoints) => [...prevPoints, { x, y }]);
        console.log("y")
        console.log(coordinatess)
        console.log("x")
        setRectanglePoints((prevPoints) => [...prevPoints, { x, y }]);
        if (rectanglePoints.length === 3) {
            setIsDrawing(true);
        }
    };

    const drawRectangle = () => {
        if (context && rectanglePoints.length === 4) {
            const [point1, point2, point3, point4] = rectanglePoints;
            context.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
            context.beginPath();
            context.moveTo(point1.x, point1.y);
            context.lineTo(point2.x, point2.y);
            context.lineTo(point3.x, point3.y);
            context.lineTo(point4.x, point4.y);
            context.closePath();
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.stroke();
        }
    };

    useEffect(() => {
        drawRectangle();
    }, [rectanglePoints]);
    return (
        <main>
            { !submit && <div style={{ position: "relative" ,display:"flex"}} >
                <img 
                    ref={imageRef}
                    src={imageUrl}
                    alt={`Podgląd zdjęcia ${index+1}`}
                    style={{ position: "absolute", top: 0, left: 0 ,marginTop:"3em"}}
                />
                <canvas onClick={test}
                    ref={canvasRef}
                    width={imageRef.current?.width}
                    height={imageRef.current?.height}
                    onMouseDown={handleMouseDown}   
                    style={{ position: "absolute", top: 0, left: 0 ,marginTop:"3em"}}
                ></canvas>
                <div style={{position:"relative",marginTop:xd}}>
                    <p>Zaznaczone koordynaty(X,Y):</p>
                    <p>1:{coordinates[0][0]},{coordinates[0][1]}</p>
                    <p>2:{coordinates[1][0]},{coordinates[1][1]}</p>
                    <p>3:{coordinates[2][0]},{coordinates[2][1]}</p>
                    <p>4:{coordinates[3][0]},{coordinates[3][1]}</p>
                    {i>3 && <button onClick={(e)=>{
                        e.preventDefault()
                        setI(0)
                        context?.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
                        setRectanglePoints([])
                        setCoordinatess(coordinatess.slice(0,coordinatess.length-4))
                        setCoordinates([[0,0],[0,0],[0,0],[0,0]])
                    }}>Resetuj</button>}
                    {categories.length>0 &&
                    <Category index={index} setChosenCategory={setChosenCategory} categories={categories}></Category>
                    }
                    <p>Tagi:</p>
                    <form onSubmit={addTag}>
                        <input type="text" placeholder="Klucz" value={key} onChange={(e)=>setKey(e.target.value)}/>
                        <input type="text" placeholder="Wartość" value={value} onChange={(e)=>setValue(e.target.value)}/>
                        <button type="submit">Dodaj</button>
                    </form>
                    {imgTags && imgTags.map((tag,index)=>{
                        return <p key={index}>{tag.key} : {tag.value}</p>
                    }
                    )}
                    <form onSubmit={handleSubmit}>
                        <button type="submit">Zapisz</button>
                    </form>
                </div>
            </div>}
        </main>
    );
}

export default DrawableImage;
