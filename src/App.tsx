import FeedbackPanel from "./components/FeedbackPanel";
import UploadForm from "./components/UploadForm";

function App() {
  return (
    <>
      <UploadForm />
      <FeedbackPanel
        heading="A few things that stood out"
        bodyText="The header layout is clear, but the call-to-action button blends into the background. Consider increasing contrast or adding whitespace. The brand tone feels modern, but typography weights could be more consistent across sections."
      />
    </>
  );
}

export default App;
