import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'

function App() {
  const [url, setUrl] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!url.trim()) {
      setQrCodeUrl("");
      setError('');
      return;
    }
    const timer = setTimeout(() => {
      generateQrCode();
    }, 600);
    return () => clearTimeout(timer);
  }, [url]);

  const generateQrCode = async () => {
    setError('');
    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(url.trim(), {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(dataUrl);
    } catch (err) {
      setError('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white font-serif p-4 '>
      {/* QR code Generator */}
      <div className='w-full max-w-md text-center space-y-4'>
        <h1 className='font-bold text-3xl md:text-4xl tracking-tight '>QR Code Generator</h1>
        <p className='text-gray-600 italic'>Generate QR code for any text or URL</p>

        <input className='text-blue-400 text-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 sm:w-full mb-6 ' type="text" placeholder="https://festus.com or just any text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={generateQrCode} disabled={isGenerating || !url.trim()} className={`${isGenerating ? 'bg-blue-800 cursor-wait' : 'bg-blue-600 cursor-pointern hover:bg-blue-700 active:scale-95'} transition-all py-2 px-4 rounded-lg font-bold`}>{isGenerating ? 'Generating...' : 'Generate QR Code'}</button>
        {error && (<p className="text-red-400 bg-red-950/40 p-3 rounded-lg">{error}</p>)}
        
        {qrCodeUrl && (<div className='mt-6 space-y-4'>
          <div className='inline-block p-4 bg-white rounded-2xl shadow-2xl transition-transform hover:scale-105'>
            <img src={qrCodeUrl} alt="Your QR code" className='w-64 h-64 md:w-80 md:h-80 object-contain'  />
          </div>
          <a href={qrCodeUrl} download='qrcode.png' className='inline-block bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold
          py-2 px-3 rounded-lg mt-6 transition-all'> Download PNG</a>
        </div>)}
        </div>
    </div>
  )
}

export default App
