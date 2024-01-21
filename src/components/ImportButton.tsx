import React, {useState} from 'react';

const ImportButton = ({setData,setYes}) => {
    const [jsonContent, setJsonContent] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const jsonContent = e.target.result;
                // @ts-ignore
                setJsonContent(jsonContent);

                try {
                    // @ts-ignore
                    setData(JSON.parse(jsonContent));
                    // @ts-ignore
                    const jsonObject = JSON.parse(jsonContent);
                    console.log('Parsed JSON:', jsonObject);
                } catch (error) {
                    console.error('Błąd parsowania JSON:', error);
                }
            };

            reader.readAsText(file);
            setYes(true)
        }
    };

    return (
        <div style={{marginLeft:40+"px"}} className="App">
            <button  onClick={() => document.getElementById('fileInput').click()}>Wczytaj JSON</button>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
    );
};

export default ImportButton;