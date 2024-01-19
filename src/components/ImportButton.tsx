import React from 'react';

const ImportButton = ({importcoco}) => {
    return (
        <form className="importcoco" onSubmit={importcoco}>
            <button typeof="submit" type="submit">Import</button>
        </form>
    );
};

export default ImportButton;