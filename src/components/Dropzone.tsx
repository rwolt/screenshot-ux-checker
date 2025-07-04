import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const Dropzone: React.FC = () => {
  return (
    <div className="w-[360px] h-[200px] rounded-md bg-gray-100 border-gray-300 flex flex-col item-center justify-center mb-4">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <AddPhotoAlternateIcon sx={{ fontSize: 72 }} />
        <div className="text-gray-700">
          Click here to upload your screenshot
        </div>
        <div className="text-sm text-gray-700">PNG or JPG only, max 5MB</div>
        <input id="file-upload" type="file" className="hidden" />
      </label>
    </div>
  );
};

export default Dropzone;
