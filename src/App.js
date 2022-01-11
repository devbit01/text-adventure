import { useState } from "react";
import TerminalInput from "./components/TerminalInput";
import TerminalOutput from "./components/TerminalOutput";
function App() {
  const [output, setOutput] = useState([]);

  const handleInput = (input) => {
    setOutput([...output, input]);
  };
  return (
    <div>
      <div id="monitor">
        <div id="screen">
          <TerminalOutput output={output} />
          <TerminalInput handleInput={handleInput} />
        </div>
      </div>
    </div>
  );
}

export default App;
