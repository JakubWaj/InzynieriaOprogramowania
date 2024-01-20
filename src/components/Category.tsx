import React from 'react';

const Category = ({ setChosenCategory, index, categories }) => {
    const styles = {
        container: {
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        label: {
            marginBottom: '8px',
            fontSize: '16px',
        },
        select: {
            padding: '8px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '200px',
        },
    };

    return (
        <div style={styles.container}>
            <form className="category" style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                <label htmlFor="category" style={styles.label}>
                    Kategoria
                </label>
                <select
                    onChange={(e) => setChosenCategory(e.target.value)}
                    style={styles.select}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
};

export default Category;