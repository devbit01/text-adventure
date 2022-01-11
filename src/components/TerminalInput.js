import React, { useState } from "react";

const TerminalInput = ({ handleInput }) => {
  const [terminalInput, setTerminalInput] = useState("");
  const [width, setWidth] = useState(0);
  const handleKeyDown = (e) => {
    console.log("typing", e.target.innerHTML);
    if (e.key === "Enter") {
      console.log("ENTER!");
      handleInput(terminalInput);
      // submit input
      setWidth(0);
      setTerminalInput("");
    }
  };
  const handleTyping = (e) => {
    console.log("working?");
    setWidth(e.target.value.length);
    setTerminalInput(e.target.value);
  };
  return (
    <div className="flex-container">
      <div className="prompt">&#62;</div>
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
        style={{ width: width + "ch" }}
      ></input>
      <div className="cursor"></div>
    </div>
  );
};

export default TerminalInput;
