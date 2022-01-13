import React, { useState, useContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import parser from "./parser";

const AppContext = React.createContext();
const prompt = ">";
const defaultState = {
  outputHistory: [],
  commands: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [commandHistory, setCommandHistory] = useState([]);

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
    <AppContext.Provider value={{ ...state, handleInput }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
