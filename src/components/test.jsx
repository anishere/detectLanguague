import  { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [scannedText, setScannedText] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    scanText(imageSrc);
  };

  const scanText = async (imageSrc) => {
    const result = await Tesseract.recognize(
      imageSrc,
      'eng', // Ngôn ngữ: English
      {
        logger: (m) => console.log(m),
      }
    );

    setScannedText(result.data.text);
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Chụp ảnh</button>
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Chụp ảnh" />
          {scannedText && (
            <div>
              <h2>Văn bản quét được:</h2>
              <p>{scannedText}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CameraComponent;
