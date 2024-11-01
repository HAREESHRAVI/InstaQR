import React, { useState } from 'react';
import './Qrcode.css';

const Qrcode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("150");

  async function generateQrCode() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${qrData.split("//")[1]?.split(".")[0] || "qr-code"}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <>
      <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {img && <img src={img} alt="user" className='Qr-code-image' />}
        {loading && <p>Please wait ...</p>}
        
        <label htmlFor="data-input" className='input-label'>Link for QR code:</label>            
        <input
          value={qrData}
          type="text"
          id="data-input"
          disabled={loading}
          onChange={(event) => setQrData(event.target.value)}
        />
        
        <label htmlFor="image-size" className='input-label'>Enter image size:</label>
        <input
          value={qrSize}
          type="number"
          id="image-size"
          placeholder="Eg:150"
          onChange={(event) => setQrSize(event.target.value)}
        />

        <div className='buttons'>
          <button className='generate-button' onClick={generateQrCode}>Generate QR code</button>
          <button className='download-button' onClick={downloadQR}>Download QR code</button>
        </div>

        <p className="footer">
          Designed by <a target="_blank" href="https://hareesh-s-portfolio.vercel.app">Hareesh</a>
        </p>
      </div>
    </>
  );
}

export default Qrcode;
