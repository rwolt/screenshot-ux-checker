import React from "react";

type FeedbackPanelProps = {
  heading: string;
  bodyText: string;
};
const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ heading, bodyText }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
      <h2 className="text-3xl mb-5">{heading}</h2>
      <p>{bodyText}</p>
    </div>
  );
};

export default FeedbackPanel;
