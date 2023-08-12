import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer, { appInitialState } from "../reducers/AppReducer";
const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, appInitialState);

  const context = { ...state, dispatch };

  useEffect(() => {}, []);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
