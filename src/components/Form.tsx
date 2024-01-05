import React from 'react';

const Form = ({imageUrl,index,image,handleSubmit,handleDelete}) => {
    return (
        <form>
            <button onClick={()=>handleSubmit} >Zatwierdz</button>
            <button onClick={(event)=>handleDelete(image,event)} >Usuń</button>
        </form>
    );
};

export default Form;