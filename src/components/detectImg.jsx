import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Tesseract from 'tesseract.js';

const ImageUploader = () => {
  const [text, setText] = useState('');
  
  const onDrop = async (acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    const { data } = await Tesseract.recognize(imageFile, 'eng', {
      logger: m => console.log(m)
    });
    setText(data.text);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag drop some image files here, or click to select files</p>
      </div>
      <p>Extracted Text:</p>
      <div>{text}</div>
    </div>
  );
};

export default ImageUploader;
