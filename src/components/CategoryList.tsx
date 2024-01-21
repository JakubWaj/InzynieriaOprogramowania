import React from 'react';

const CategoryList = ({categories}) => {
    return (
        <>
            <h2 style={{marginLeft:40+"px"}}>Kategorie</h2>
            {categories.map((category, index) => (
                <p  style={{marginLeft:40+"px"}} key={index}>{category}</p>
            ))}
        </>
    );
};

export default CategoryList;