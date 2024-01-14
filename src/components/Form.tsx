import React from 'react';

const Form = ({image,handleSubmit,handleDelete}) => {
    return (
        <form>
            <button onClick={()=>handleSubmit} >Zatwierdz</button>
            <button onClick={(event)=>handleDelete(image,event)} >Usuń</button>
        </form>
    );
};

export default Form;