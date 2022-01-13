import React, { useState, useContext, useReducer, useEffect } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
