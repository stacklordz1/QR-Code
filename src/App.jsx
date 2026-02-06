import React, { useState } from 'react'
import QRCode from 'qrcode'

function App() {
  const [url, setUrl] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQrCode = () => {
    QRCode.toDataURL(url,

      (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        setQrCodeUrl(url);
      });
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white font-serif '>
      {/* QR code Generator */}
      <div className='text-center space-y-4'>
        <h1 className='text-bold text-2xl '>QR Code Generator</h1>
        <p className='text-gray-600 italic'>Generate QR codes for any text or URL</p>

        <input className='text-blue-400 text-xl border rounded-lg px-3 py-2 sm:w-full mb-6' type="text" placeholder="Enter text or URL/https://google.com" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className='animate-pulse bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg' onClick={generateQrCode}>Generate QR Code</button>
        {qrCodeUrl && (
          <div className='mt-6'>
            <img src={qrCodeUrl} alt="Generated QR Code" className=' mx-auto mt-6 p-4 bg-white rounded-xl shadow-xl  transition-transform duration-300
                                      hover:scale-105 md:w-[400px] w-[300px]  dark:bg-gray-950 ' />
          </div>
        )}
        {qrCodeUrl && (<a href={qrCodeUrl} download="qr-code.png" className='mt-6 animate-pulse inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'>Download QR Code</a>)}
      </div>
    </div>
  )
}

export default App
