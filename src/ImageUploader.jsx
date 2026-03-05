import React, { useRef, useState, useCallback } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, X } from 'lucide-react';
import Webcam from 'react-webcam';

const ImageUploader = ({ preview, onImageChange, theme }) => {
  const galleryInputRef = useRef(null);
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);

  // Theme colors based on Plant (green) or Animal (pink)
  const colors = {
    green: { border: 'border-green-200', bg: 'bg-green-50', hover: 'hover:bg-green-100/50', icon: 'text-green-400', btnPrimary: 'bg-green-600 hover:bg-green-700', btnSecondary: 'text-green-700 border-green-300 hover:bg-green-50' },
    pink: { border: 'border-pink-200', bg: 'bg-pink-50', hover: 'hover:bg-pink-100/50', icon: 'text-pink-400', btnPrimary: 'bg-pink-600 hover:bg-pink-700', btnSecondary: 'text-pink-700 border-pink-300 hover:bg-pink-50' }
  };
  const currentTheme = colors[theme] || colors.green;

  // This grabs the screenshot and packages it perfectly for your App.jsx
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          // Convert the snapshot into a standard File object
          const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
          // Send it to App.jsx exactly how it expects it (mocking the standard file event)
          onImageChange({ target: { files: [file] } });
          setShowWebcam(false); // Close the webcam feed
        });
    }
  }, [webcamRef, onImageChange]);

  return (
    <div className={`flex-1 border-2 border-dashed ${currentTheme.border} rounded-xl ${currentTheme.bg} flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all ${currentTheme.hover} min-h-[300px]`}>
      
      {preview ? (
         // Show image preview
         <img src={preview} alt="Upload preview" className="absolute inset-0 w-full h-full object-cover rounded-xl z-10" />
      ) : showWebcam ? (
        // LIVE WEBCAM VIEW
        <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center rounded-xl overflow-hidden">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }} // Uses rear camera on phones, standard webcam on laptop
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute bottom-4 flex gap-4">
            <button onClick={capturePhoto} className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg hover:bg-gray-200">
              Snap Photo
            </button>
            <button onClick={() => setShowWebcam(false)} className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600">
              <X size={24} />
            </button>
          </div>
        </div>
      ) : (
        // DEFAULT BUTTON VIEW
        <div className="text-center z-10">
          <UploadCloud size={48} className={`${currentTheme.icon} mx-auto mb-4`} />
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
              onClick={() => setShowWebcam(true)}
              className={`${currentTheme.btnPrimary} text-white px-4 py-2 rounded-lg font-bold shadow-md flex items-center justify-center gap-2 transition-colors`}
            >
              <Camera size={18} /> Open Camera
            </button>
            
            <button 
              onClick={() => galleryInputRef.current.click()}
              className={`bg-white ${currentTheme.btnSecondary} border px-4 py-2 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 transition-colors`}
            >
              <ImageIcon size={18} /> Open Gallery
            </button>
          </div>
        </div>
      )}

      {/* Hidden Input for Gallery */}
      <input 
        type="file" 
        accept="image/*" 
        ref={galleryInputRef} 
        className="hidden" 
        onChange={onImageChange} 
      />
    </div>
  );
};

export default ImageUploader;