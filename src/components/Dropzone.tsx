import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileUploaded(true);
      setFileName(file.name);
      onFileSelect(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[360px] h-[200px] rounded-md bg-gray-100 border-gray-300 mb-6 relative overflow-hidden">
      {fileUploaded && imagePreview ? (
        <div className="w-full h-full bg-white">
          <img 
            src={imagePreview} 
            alt="Uploaded screenshot" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block' // Force block display
            }}
          />
          <input 
            id="file-upload" 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={handleFileChange} 
            accept=".png,.jpg,.jpeg" 
          />
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
        >
          <AddPhotoAlternateIcon sx={{ fontSize: 72 }} />
          <div className="text-gray-700">
            Click here to upload your screenshot
          </div>
          <div className="text-sm text-gray-700">PNG or JPG only, max 5MB</div>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".png,.jpg,.jpeg" 
          />
        </label>
      )}
    </div>
  );
};

export default Dropzone;
