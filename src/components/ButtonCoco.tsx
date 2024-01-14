import React from 'react';

const ButtonCoco = ({exportToCoco}) => {
    return (
        <form className="coco" onSubmit={exportToCoco}>
            <button typeof="submit" type="submit">Export to coco</button>
        </form>
    );
};

export default ButtonCoco;