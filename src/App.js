import "./index.css";

import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const App = () => {
  const [textToCopy, setTextToCopy] = useState();

  const clearText = () => {
    setTextToCopy("");
  };
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setTextToCopy(transcript);
  };

  const handleClear = () => {
    resetTranscript();
    setTextToCopy("");
    navigator.clipboard.writeText("");
  };

  return (
    <>
      <div className="container">
        <div className="main-content">{transcript}</div>
        <br></br>

        <div className="btn-style">
          <button onClick={handleCopy} className="button">
            {textToCopy ? "Copied!" : "Copy to clipboard"}
          </button>
          <button onClick={startListening} className="button">
            Start Listening
          </button>
          <button onClick={SpeechRecognition.stopListening} className="button">
            Stop Listening
          </button>
          <button onClick={handleClear} className="button">
            Clear Text
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
