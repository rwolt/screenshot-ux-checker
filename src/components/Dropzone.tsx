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
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[360px] h-[200px] rounded-md bg-gray-100 border-gray-300 flex flex-col item-center justify-center mb-6 relative overflow-hidden">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
      >
        {fileUploaded && imagePreview ? (
          <div className="relative w-full h-full">
            <img 
              src={imagePreview} 
              alt="Uploaded screenshot" 
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 text-white text-center">
                <CheckCircleIcon sx={{ fontSize: 24, marginBottom: 1 }} />
                <div className="text-sm">Click to change image</div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <AddPhotoAlternateIcon sx={{ fontSize: 72 }} />
            <div className="text-gray-700">
              Click here to upload your screenshot
            </div>
            <div className="text-sm text-gray-700">PNG or JPG only, max 5MB</div>
          </>
        )}
        <input 
          id="file-upload" 
          type="file" 
          className="hidden" 
          onChange={handleFileChange} 
          accept=".png,.jpg,.jpeg" 
        />
      </label>
    </div>
  );
};

export default Dropzone;
