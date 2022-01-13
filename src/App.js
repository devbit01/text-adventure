import { useState, useEffect, useReducer } from "react";
import TerminalInput from "./components/TerminalInput";
import TerminalOutput from "./components/TerminalOutput";
import { reducer } from "./handlers/reducer";
import parser from "./handlers/parser";

const defaultState = {
  outputHistory: [],
  commands: [],
};
function App() {
  const screenDimensions = { width: 50, height: 26 };
  const [commandHistory, setCommandHistory] = useState([]);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const prompt = ">";

  const tell = (message, newLine = false) => {
    dispatch({ type: "ADD_OUTPUT", payload: message });
    if (newLine) {
      dispatch({ type: "ADD_OUTPUT", payload: "" });
    }
  };

  // main process loop
  const process = (pAction, pObject, pIObject) => {
    /* 
    order of operations: 
    - check pIObject for ActionRoutine
    - check pObject for ActionRoutine
    - check pAction for ActionRoutine
    - run end of room routine (if exists)
    - run "clocker"
      - clocker counts down all queued events and runs them if it is their time
    */
    tell(`Action: ${pAction}`, true);
    dispatch({ type: pAction });
  };

  const handleInput = (input) => {
    setCommandHistory([...commandHistory, input]);
    tell(prompt + input.toUpperCase());

    const { success, message, pAction, pObject, pIndirectObject } = parser(
      input.toUpperCase()
    );

    if (success) {
      process(pAction, pObject, pIndirectObject);
    } else {
      tell(message, true);
    }
  };

  useEffect(() => {
    // initial load only
    console.log("loading....");
    dispatch({ type: "LOAD_COMMANDS", payload: ["CLEAR", "HELP"] });
  }, []);

  return (
    <div>
      <div id="monitor">
        <div className="scanline"></div>
        <div id="screen" style={{ width: `${screenDimensions.width + 4}ch` }}>
          <TerminalOutput output={state.outputHistory} />
          <TerminalInput
            handleInput={handleInput}
            commandHistory={commandHistory}
            maxChars={screenDimensions.width}
            prompt={prompt}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
