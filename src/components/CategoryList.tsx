import React from 'react';

const CategoryList = ({categories}) => {
    return (
        <>
            <h2>Kategorie</h2>
            {categories.map((category, index) => (
                <p key={index}>{category}</p>
            ))}
        </>
    );
};

export default CategoryList;