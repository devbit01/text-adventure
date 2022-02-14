import React, { useState, useContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import { synonyms, stopWords, synonmys_map } from "./data";
import { zorkGameData, rooms } from "./games/zorkGameData";

const AppContext = React.createContext();

const defaultState = {
  commands: [],
  rooms: rooms,
  synonyms: synonyms,
  stopWords: stopWords,
  here: "NORTH",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [gameState, setGameState] = useState(defaultState);
  const [synonymLookup, setSynonymLookup] = useState(new Map());
  const [commandHistory, setCommandHistory] = useState([]);
  const [outputHistory, setOutputHistory] = useState([]);

  const tell = (message, newLine = false) => {
    setOutputHistory((previousState) => {
      return [...previousState, message];
    });
    if (newLine) {
      setOutputHistory((previousState) => {
        return [...previousState, ""];
      });
    }
  };

  const handleClearOutput = () => {
    setOutputHistory([]);
    return true;
  };

  const handleInput = (input) => {
    console.log("at index:", "AT".indexOf(" "));

    input = input.toUpperCase();
    tell(">" + input);
    setCommandHistory([...commandHistory, input]);
    const punctuations = [".", ",", "!", "?"];

    // remove punctuations and remove "stop" words
    const cleanedInput = cleanInput(input, punctuations);

    for (let word of cleanedInput.split(" ")) {
      if (!synonymLookup.has(word)) {
        tell(`I don't know the word "${word}".`, true);
        return false;
      }

      const lookup = synonymLookup.get(word);
      tell(`type: ${lookup.type}, keyword: ${lookup.keyWord}`, true);

      if (lookup.keyWord === "CLEAR") {
        handleClearOutput();
      }
    }
  };

  useEffect(() => {
    // initial load only
    console.log("loading game data....");
    console.log("loading synonyms");
    setSynonymLookup(synonmys_map());
  }, []);

  return (
    <AppContext.Provider
      value={{
        handleInput,
        outputHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

function cleanInput(input, punctuations) {
  return input
    .split("")
    .filter((char) => !punctuations.includes(char))
    .join("")
    .split(" ")
    .filter((word) => !stopWords.includes(word))
    .join(" ");
}
