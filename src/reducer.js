export const reducer = (state, action) => {
  if (action.type === "ADD_OUTPUT") {
    return {
      ...state,
      outputHistory: [...state.outputHistory, action.payload],
    };
  }
  if (action.type === "LOAD_COMMANDS") {
    return { ...state, commands: state.commands.concat(action.payload) };
  }
  if (action.type === "V-CLEAR-SCREEN") {
    console.log("clearing screen");
    return { ...state, outputHistory: [] };
  }

  if (action.type === "SETHERE") {
    return { ...state, here: action.payload };
  }
  if (action.type === "UPDATE_STATE") {
    console.log("updating state with tempstate:", action.payload);
    return action.payload;
  }

  return state;
};
