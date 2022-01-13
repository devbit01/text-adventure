import React, { useState, useRef, useEffect } from "react";

const TerminalInput = ({ handleInput, commandHistory, maxChars, prompt }) => {
  const [terminalInput, setTerminalInput] = useState("");
  const [width, setWidth] = useState(0);
  const inputTerminal = useRef(null);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        handleInput(terminalInput);
        setWidth(0);
        setTerminalInput("");

        break;
      case "ArrowUp":
        // future feature
        break;
      case "ArrowDown":
        // future feature
        break;
      default:
      /* do nothing */
    }
  };

  useEffect(() => {
    inputTerminal.current.focus();
  });

  const handleTyping = (e) => {
    let tempVal = e.target.value;
    let maxLen = maxChars; // max # of characters on input
    tempVal = tempVal.length > maxLen ? tempVal.substring(0, maxLen) : tempVal;
    setWidth(tempVal.length);
    setTerminalInput(tempVal);
  };
  const refocus = () => {
    inputTerminal.current.focus();
  };
  return (
    <div className="flex-container">
      <div className="prompt">{prompt}</div>
      <input
        autoFocus
        type="text"
        id="terminalInput"
        name="terminalInput"
        className="terminal"
        onChange={handleTyping}
        onKeyDown={handleKeyDown}
        value={terminalInput}
        autoComplete="off"
        contentEditable="true"
        ref={inputTerminal}
        style={{ width: width + "ch" }}
        onBlur={refocus}
      ></input>
      <div className="cursor"></div>
    </div>
  );
};

export default TerminalInput;
