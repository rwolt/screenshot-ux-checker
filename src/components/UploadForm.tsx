import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import Dropzone from "./Dropzone";
import { useScreenshotAnalysis } from "../hooks/useScreenshotAnalysis";

interface UploadFormProps {
  onFeedbackReceived: (feedback: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onFeedbackReceived }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { analyzeScreenshot, loading, error, resetError } = useScreenshotAnalysis();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    resetError(); // Clear any previous errors when new file is selected
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    try {
      const feedback = await analyzeScreenshot(selectedFile);
      onFeedbackReceived(feedback);
    } catch (error) {
      // Error is already handled in the hook, just log it
      console.error('Error analyzing screenshot:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-gray-900 mb-6 mt-16 mb-10">
        Upload your design for feedback
      </h1>
      <Dropzone onFileSelect={handleFileSelect} />
      {error && (
        <div className="text-red-600 text-sm mb-4 max-w-md text-center">
          {error}
        </div>
      )}
      <SubmitButton 
        onClick={handleSubmit} 
        loading={loading} 
        disabled={!selectedFile} 
      />
    </div>
  );
};

export default UploadForm;
