import React from 'react';

const DatasetName = ({name,setName,handleDatasetName}) => {
    return (
        <form style={{marginLeft:40+"px"}} className="dataset" onSubmit={handleDatasetName}>
            <label htmlFor="dataset">Nazwa zbioru</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        </form>
    );
};

export default DatasetName;