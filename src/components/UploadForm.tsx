import React from "react";
import SubmitButton from "./SubmitButton";
import Dropzone from "./Dropzone";

const UploadForm: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-gray-900 mb-6 mt-16 mb-10">
        Upload your design for feedback
      </h1>
      <Dropzone />
      <SubmitButton />
    </div>
  );
};

export default UploadForm;
