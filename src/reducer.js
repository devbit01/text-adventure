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
    return { ...state, outputHistory: [] };
  }

  return state;
};
