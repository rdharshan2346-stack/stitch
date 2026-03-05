import React, { useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ preview, onImageChange, theme }) => {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Safely define Tailwind colors for the different sections
  const colors = {
    green: { border: 'border-green-200', bg: 'bg-green-50', hover: 'hover:bg-green-100/50', icon: 'text-green-400', btnPrimary: 'bg-green-600 hover:bg-green-700', btnSecondary: 'text-green-700 border-green-300 hover:bg-green-50' },
    pink: { border: 'border-pink-200', bg: 'bg-pink-50', hover: 'hover:bg-pink-100/50', icon: 'text-pink-400', btnPrimary: 'bg-pink-600 hover:bg-pink-700', btnSecondary: 'text-pink-700 border-pink-300 hover:bg-pink-50' }
  };
  const currentTheme = colors[theme] || colors.green;

  return (
    <div className={`flex-1 border-2 border-dashed ${currentTheme.border} rounded-xl ${currentTheme.bg} flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all ${currentTheme.hover}`}>
      
      {preview ? (
         // If there is an image, show the preview
         <img src={preview} alt="Upload preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
      ) : (
        // If no image, show the cloud icon and our two new buttons
        <div className="text-center z-10">
          <UploadCloud size={48} className={`${currentTheme.icon} mx-auto mb-4`} />
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
              onClick={() => cameraInputRef.current.click()}
              className={`${currentTheme.btnPrimary} text-white px-4 py-2 rounded-lg font-bold shadow-md flex items-center justify-center gap-2 transition-colors`}
            >
              <Camera size={18} /> Take Photo
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

      {/* Hidden Inputs linked to the buttons */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={cameraInputRef} 
        className="hidden" 
        onChange={onImageChange} 
      />
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