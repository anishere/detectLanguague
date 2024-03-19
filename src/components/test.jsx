import { useState } from 'react';
import Tesseract from 'tesseract.js';

const CameraComponent = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [scannedText, setScannedText] = useState('');
  const [stream, setStream] = useState(null);
  let videoRef = null;
  let canvasRef = null;

  const handleCapture = () => {
    const context = canvasRef.getContext('2d');
    context.drawImage(videoRef, 0, 0, 300, 150);
    const imageUrl = canvasRef.toDataURL('image/png');
    setCapturedImage(imageUrl);

    // Xử lý ảnh thành ảnh trắng đen
    const imageData = context.getImageData(0, 0, canvasRef.width, canvasRef.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    context.putImageData(imageData, 0, 0);

    // Quét văn bản từ ảnh trắng đen
    Tesseract.recognize(
      canvasRef,
      ['eng', 'chi_sim', 'rus', 'fra', 'tha', 'vie', 'jpn'],
      { logger: (m) => console.log(m) }
    ).then(({ data: { text } }) => {
      setScannedText(text);
    });
  };

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment' // Chỉ định sử dụng camera sau
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.srcObject = stream;
      setStream(stream); // Lưu lại đối tượng stream
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // Dừng camera
      setStream(null); // Xóa đối tượng stream
    }
  };

  return (
    <div>
      <video ref={(ref) => (videoRef = ref)} autoPlay width="300" height="200" />
      <canvas ref={(ref) => (canvasRef = ref)} style={{ display: 'none' }} width="300" height="200" />
      <button onClick={handleCapture}>Capture</button>
      {capturedImage && <img src={capturedImage} alt="Captured" />}
      {scannedText && <p>{scannedText}</p>}
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button> {/* Thêm nút để dừng camera */}
    </div>
  );
};

export default CameraComponent;
