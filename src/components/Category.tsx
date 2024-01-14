import React from 'react';

const Category = ({setChosenCategory,index,categories}) => {
    return (
        <div>
            <form className={"category"}>
                <label htmlFor="category">Kategoria</label>
            <select onChange={(e)=>setChosenCategory(e.target.value)}>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            </form>
        </div>
    );
};

export default Category;