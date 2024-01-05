import { useState,useEffect } from 'react'
import './App.css'
import ImageUploader from "./components/ImageUploader.tsx";
import ImageViewer from "./components/ImageViewer.tsx";

function App() {
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [selectedImagesURL, setSelectedImagesURL] = useState<string[]>([]);

    const handleDelete = (id,e) => {
        e.preventDefault();
        const newImages = Array.from(selectedImages).filter((image) => image.name !== id.name);
        setSelectedImages(newImages)
    };
    const handleSubmit = (id: number) => {
    };
    useEffect(() => {
        if (selectedImages) {
            const newImages: string[] = [];
            
            Array.from(selectedImages).forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    newImages.push(reader.result as string);
                    if (newImages.length === selectedImages.length) {
                        setSelectedImagesURL(newImages);
                    }
                };
                console.log(newImages);
                reader.readAsDataURL(file);
            });
        }
    }, [selectedImages]);
  return (
    <div className="App">
        <ImageUploader images={selectedImages}  setImages={setSelectedImages} />
        {selectedImages.length > 0 && 
      <ImageViewer images={selectedImages} imagesUrl={selectedImagesURL} handleSubmit={handleSubmit} handleDelete={handleDelete}/>}
    </div>
      
  )
}

export default App
