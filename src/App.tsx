import React, { useState } from "react";
import FeedbackPanel from "./components/FeedbackPanel";
import UploadForm from "./components/UploadForm";

function App() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleFeedbackReceived = (feedbackText: string) => {
    setFeedback(feedbackText);
  };

  return (
    <>
      <UploadForm onFeedbackReceived={handleFeedbackReceived} />
      {feedback && (
        <FeedbackPanel
          heading="UX Feedback"
          bodyText={feedback}
        />
      )}
    </>
  );
}

export default App;
