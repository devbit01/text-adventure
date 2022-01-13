import React from "react";

const TerminalOutput = ({ output }) => {
  return (
    <div className="output-container">
      {output.map((line, index) => {
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
