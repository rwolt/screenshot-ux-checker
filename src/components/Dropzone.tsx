import React, {useState} from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileUploaded(true);
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-[360px] h-[200px] rounded-md bg-gray-100 border-gray-300 flex flex-col item-center justify-center mb-6">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        {fileUploaded ? (
          <>
            <CheckCircleIcon sx={{ fontSize: 72, color: "green" }} />
            <div className="text-green-700 font-medium">
              File uploaded successfully!
            </div>
            <div className="text-sm text-gray-600">{fileName}</div>
          </>
        ) : (
          <>
            <AddPhotoAlternateIcon sx={{ fontSize: 72 }} />
            <div className="text-gray-700">
              Click here to upload your screenshot
            </div>
            <div className="text-sm text-gray-700">PNG or JPG only, max 5MB</div>
          </>
        )}
        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".png,.jpg,.jpeg" />
      </label>
    </div>
  );
};

export default Dropzone;
