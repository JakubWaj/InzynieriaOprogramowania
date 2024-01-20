import React, { useRef, useState, useEffect } from "react";
import Form from "./Form.tsx";
import {Tags} from "exifreader";
import * as ExifReader from "exifreader";
import Category from "./Category.tsx";

const DrawableImage = ({counter,setCounter, data,tagss,annotationss,coco,chosenCategory,setCoco,categories,setChosenCategory,image,imageUrl,index})=> {
    const [category,setCategory] = useState<string>('');
    const [color,setColor] = useState<string>("red");
    const [imported,setImported] = useState<boolean>(false);
    useEffect(() => {
        console.log(color)
    }, [color]);

    useEffect(() => {
        let x1 = []
        for (let i = 0; i < annotationss.length; i++) {
            let obj = annotationss[i];
            x1.push(
                {coordinate:{x1:obj.coordinate.x1,y1:obj.coordinate.y1,x2:obj.coordinate.x2,x3:obj.coordinate.x3,x4:obj.coordinate.x4,y2:obj.coordinate.y2,y3:obj.coordinate.y3,y4:obj.coordinate.y4},
                    category:obj.category}
            )
        }
        setAnnotations(x1)
        let x2 = []
        for (let i = 0; i < annotationss.length; i++) {
            let obj = annotationss[i];
            let color = ""
            if (obj.category === categories[0])
                color = "red"
            if (obj.category === categories[1])
                color = "blue"
            if (obj.category === categories[2])
                color = "green"
            if (obj.category === categories[3])
                color = "yellow"
            if (obj.category === categories[4])
                color = "purple"
            if (obj.category === categories[5])
                color = "orange"
            if (obj.category === categories[6])
                color = "brown"
            if (obj.category === categories[7])
                color = "pink"
            if (obj.category === categories[8])
                color = "black"
            x2.push(
                {x1:obj.coordinate.x1,y1:obj.coordinate.y1,x2:obj.coordinate.x2,x3:obj.coordinate.x3,x4:obj.coordinate.x4,y2:obj.coordinate.y2,y3:obj.coordinate.y3,y4:obj.coordinate.y4,
                    color:color}
            )
        }
        setDraws(x2)
        let x3 = []
        for (let i = 0; i < tagss.length; i++) {
            let obj = tagss[i];
            x3.push(
                {key:obj.key,value:obj.value}
            )
        }
        setImgTags(x3)
        console.log(draws)
        console.log(annotations)
        console.log(imgTags)
        setImported(true);
    }, [data]);
    useEffect(() => {
        drawRectangle3()
    }, [imported]);
    const funkcja = (e) => {
        e.preventDefault()
        let x1 = []
        for (let i = 0; i < annotationss.length; i++) {
            let obj = annotationss[i];
            x1.push(
                {coordinate:{x1:obj.coordinate.x1,y1:obj.coordinate.y1,x2:obj.coordinate.x2,x3:obj.coordinate.x3,x4:obj.coordinate.x4,y2:obj.coordinate.y2,y3:obj.coordinate.y3,y4:obj.coordinate.y4},
                category:obj.category}
            )
        }
        setAnnotations(x1)
        let x2 = []
        for (let i = 0; i < annotationss.length; i++) {
            let obj = annotationss[i];
            let color = ""
            if (obj.category === categories[0])
                color = "red"
            if (obj.category === categories[1])
                color = "blue"
            if (obj.category === categories[2])
                color = "green"
            if (obj.category === categories[3])
                color = "yellow"
            if (obj.category === categories[4])
                color = "purple"
            if (obj.category === categories[5])
                color = "orange"
            if (obj.category === categories[6])
                color = "brown"
            if (obj.category === categories[7])
                color = "pink"
            if (obj.category === categories[8])
                color = "black"
            x2.push(
                {x1:obj.coordinate.x1,y1:obj.coordinate.y1,x2:obj.coordinate.x2,x3:obj.coordinate.x3,x4:obj.coordinate.x4,y2:obj.coordinate.y2,y3:obj.coordinate.y3,y4:obj.coordinate.y4,
                    color:color}
            )
        }
        setDraws(x2)
        let x3 = []
        for (let i = 0; i < tagss.length; i++) {
            let obj = tagss[i];
            x3.push(
                {key:obj.key,value:obj.value}
            )
        }
        setImgTags(x3)
        console.log(draws)
        console.log(annotations)
        console.log(imgTags)    
        drawRectangle3()
    };
    
    useEffect(() => {
        if (category===categories[0])
            setColor("red")
        if (category===categories[1])
            setColor("blue")
        if (category===categories[2])
            setColor("green")
        if (category===categories[3])
            setColor("yellow")
        if (category===categories[4])
            setColor("purple")
        if (category===categories[5])
            setColor("orange")
        if (category===categories[6])
            setColor("brown")
        if (category===categories[7])
            setColor("pink")
        if (category===categories[8])
            setColor("black")
    }, [category]);
    
    useEffect(() => {
        setCategory(categories[0])
    }, []);
    const [draws,setDraws] = useState<{x1:number;y1:number;x2:number;y2:number;x3:number;y3:number;x4:number;y4:number;color:string}[]>([]);
    const [coordinatess,setCoordinatess] = useState<{ x: number; y: number }[]>([]);
    const [annotations,setAnnotations] = useState<{coordinate:{x1:number;y1:number;x2:number;y2:number;x3:number;y3:number;x4:number;y4:number;},category:string}[]>([])
    const handleSubmit = (e)=>{
        e.preventDefault()
        const newCoco = {
            id:index,
            width:tags['Image Width'].value,
            height:tags['Image Height'].value,
            file_name:image.name,
            tags:imgTags,
            position: annotations
        }
        let x = counter+1;
        setCounter(x)
        console.log("test")
        console.log(counter)
        console.log(index)
        console.log("test")
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
        if (i<4) {
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
        test()
        const { clientX, clientY } = event;
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = clientX - (rect?.left || 0);
        const y = clientY - (rect?.top || 0);
        setCoordinatess((prevPoints) => [...prevPoints, { x, y }]);
        setRectanglePoints((prevPoints) => [...prevPoints, { x, y }]);
        if (rectanglePoints.length === 3) {
            setIsDrawing(true);
        }
    };

    const drawRectangle = () => {
        if (context && rectanglePoints.length === 4) {
            const [point1, point2, point3, point4] = rectanglePoints;
            context.beginPath();
            context.moveTo(point1.x, point1.y);
            context.lineTo(point2.x, point2.y);
            context.lineTo(point3.x, point3.y);
            context.lineTo(point4.x, point4.y);
            context.closePath();
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.stroke();
            setDraws([...draws,{x1:point1.x,y1:point1.y,x2:point2.x,y2:point2.y,x3:point3.x,y3:point3.y,x4:point4.x,y4:point4.y,color:color}])
            setAnnotations([...annotations,{coordinate:{x1:coordinates[0][0],y1:coordinates[0][1],x2:coordinates[1][0],y2:coordinates[1][1],x3:coordinates[2][0],y3:coordinates[2][1],x4:coordinates[3][0],y4:coordinates[3][1]},category:category}])
            console.log(category)
            console.log(coordinates[0][0])
            console.log(coordinates[0][1])
            console.log(point1.x)
            console.log(point1.y)
            setCoordinates([[0,0],[0,0],[0,0],[0,0]])
            setRectanglePoints([])
            setI(0)
        }
    };

    const drawRectangle2 = () => {
            console.log("wchodzi cos?")
            //remove last element from draws
            draws.pop()
            //remove last element from annotations
            annotations.pop()
            context.clearRect(0, 0, imageRef.current?.width || 0, imageRef.current?.height || 0)
            for(let i =0;i<draws.length;i++) {
                console.log(i)
            context.beginPath();
            context.moveTo(draws[i].x1, draws[i].y1);
            context.lineTo(draws[i].x2, draws[i].y2);
            context.lineTo(draws[i].x3, draws[i].y3);
            context.lineTo(draws[i].x4, draws[i].y4);
            context.closePath();
            context.strokeStyle = draws[i].color;
            context.lineWidth = 2;
            context.stroke();
            }
    };

    const drawRectangle3 = () => {
        for(let i =0;i<draws.length;i++) {
            context.beginPath();
            context.moveTo(draws[i].x1, draws[i].y1);
            context.lineTo(draws[i].x2, draws[i].y2);
            context.lineTo(draws[i].x3, draws[i].y3);
            context.lineTo(draws[i].x4, draws[i].y4);
            context.closePath();
            context.strokeStyle = draws[i].color;
            context.lineWidth = 2;
            context.stroke();
        }
    };
    
    useEffect(() => {
        console.log(annotations)
    }, [annotations]);
    useEffect(() => {
        drawRectangle();
    }, [rectanglePoints]);
    
    const handleRemove = (e)=> {
        e.preventDefault();
        drawRectangle2()
    }
    const [seeTags,setSeeTags] = useState<boolean>(true)
    const handleSeeTags = (e)=> {
        e.preventDefault();
        setSeeTags(!seeTags)
    }
    
    const AreIndexAndCounterEqual = () => {
        console.log(index)
        console.log(counter)
        return index === counter;
    }
    
    return (
        <>
        <main>
            { !submit && <div style={{ position: "relative" ,display:"flex"}} >
                <img 
                    ref={imageRef}
                    src={imageUrl}
                    alt={`Podgląd zdjęcia ${index+1}`}
                    style={{ position: "absolute", top: 0, left: 0 ,marginTop:"3em"}}
                />
                <canvas 
                    ref={canvasRef}
                    width={imageRef.current?.width}
                    height={imageRef.current?.height}
                    onMouseDown={handleMouseDown}   
                    style={{ position: "absolute", top: 0, left: 0 ,marginTop:"3em"}}
                ></canvas>
                <div style={{position:"relative",marginTop:xd+20}}>
                    <div style={{display:"flex"}}>
                        <button onClick={handleRemove}>Cofnij</button>
                    <form onSubmit={funkcja}>
                        <button type="submit">Odśwież</button>
                    </form>
                    <form onSubmit={handleSeeTags}>
                        <button type="submit">{seeTags? "Ukryj tagi" : "Pokaż tagi"}</button>
                    </form>
                    </div>
                    {categories.length>0 &&
                    <Category index={index} setChosenCategory={setCategory} categories={categories}></Category>
                    }
                    {seeTags &&<>
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
                    </>}
                    <form onSubmit={handleSubmit}>
                        <button type="submit">Zapisz</button>
                    </form>
                </div>
            </div>}
        </main>
        </>
    );
}

export default DrawableImage;
