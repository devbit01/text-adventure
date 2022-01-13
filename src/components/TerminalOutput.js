import React from "react";
import { useGlobalContext } from "../context";

const TerminalOutput = ({ output }) => {
  const { outputHistory } = useGlobalContext();
  return (
    <div className="output-container">
      {outputHistory.map((line, index) => {
        return (
          <div key={index} className="output">
            {line}
          </div>
        );
      })}
    </div>
  );
};

export default TerminalOutput;
