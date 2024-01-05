import React, {useEffect, useState} from 'react';
import * as ExifReader from 'exifreader';
import {Tags} from "exifreader";
const Info = ({image}) => {
    const [tags, setTags] = useState<Tags>()
    const [clicked, setClicked] = useState<boolean>(false)

    const onclick = async () => {
        const tags = await ExifReader.load(image, {async: true});
        setTags(tags);
        setClicked(true)
    }
    
    return (
        <div onClick={onclick}>
            <p>Infor</p>
            {clicked && (<main>
{/*            <p>Rozmiar: {tags['Bits Per Sample'].description}</p>*/}
            <p>Rozmiar: {tags['Image Width'].value}</p>
            <p>Rozmiar: {tags['Image Height'].value}</p>
            </main>)
            }
        </div>
    );
};

export default Info;