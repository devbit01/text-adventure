import { useState, useEffect, useReducer } from "react";
import TerminalInput from "./components/TerminalInput";
import TerminalOutput from "./components/TerminalOutput";
import Parser from "./components/Parser";

function App() {
  const screenDimensions = { width: 50, height: 26 };
  const prompt = ">";

  return (
    <div>
      <Parser prompt={prompt} />
      <div id="monitor">
        <div className="scanline"></div>
        <div id="screen" style={{ width: `${screenDimensions.width + 4}ch` }}>
          <TerminalOutput />
          <TerminalInput maxChars={screenDimensions.width} prompt={prompt} />
        </div>
      </div>
    </div>
  );
}

export default App;
