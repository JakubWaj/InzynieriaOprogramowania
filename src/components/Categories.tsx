import React from 'react';

const Categories = ({handleCategory,category,setCategory}) => {
    return (
        <form className="category" onSubmit={handleCategory}>
            <label htmlFor="category">Kategoria</label>
            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} />
            <button typeof="submit" type="submit">Dodaj</button>
        </form>
    );
};

export default Categories;