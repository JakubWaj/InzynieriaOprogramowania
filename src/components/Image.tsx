import React, {useState} from 'react';
import Form from "./Form.tsx";
import Info from "./Info.tsx";

const Image = ({imageUrl,index,image,handleSubmit,handleDelete}) => {
    const [i,setI] = useState(0);
    const coordinates = useState([0,0,0,0,0,0,0,0]);
    const test = ()=>{
        if (i<8) {
            console.log(event.offsetX);
            console.log(event.offsetY);
            coordinates[0][i] = event.offsetX;
            coordinates[0][i+1] = event.offsetY;
            setI(i+2);
        }
    }
    
    return (
        <div>
            <img  onClick={test}
                key={index}
                src={imageUrl}
                alt={`Podgląd zdjęcia ${index+1}`}
                style={{ maxWidth: '100%', maxHeight: '100%', marginRight: '10px', cursor: 'pointer' }}
            />
            <Form image={image} imageUrl={imageUrl} index={index} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
            <p>Zaznaczone koordynaty(X,Y):</p>
            <p>1:{coordinates[0][0]},{coordinates[0][1]}</p>
            <p>2:{coordinates[0][2]},{coordinates[0][3]}</p>
            <p>3:{coordinates[0][4]},{coordinates[0][5]}</p>
            <p>4:{coordinates[0][6]},{coordinates[0][7]}</p>
            {i>7 && <button onClick={(e)=>{
                e.preventDefault()
                setI(0)
                coordinates[0] = [0,0,0,0,0,0,0,0]
            }}>Resetuj</button>}
            <Info image={image}/>
        </div>
    );
};

export default Image;