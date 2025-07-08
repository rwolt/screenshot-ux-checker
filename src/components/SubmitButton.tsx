import React from "react";

interface SubmitButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  onClick, 
  loading = false, 
  disabled = false 
}) => {
  return (
    <button 
      className={`w-[200px] h-[50px] text-white text-xl rounded-md mb-12 ${
        disabled || loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gray-700 hover:bg-gray-800 cursor-pointer'
      }`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Analyzing..." : "Get Feedback"}
    </button>
  );
};

export default SubmitButton;
