import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer, { appInitialState } from "../reducers/AppReducer";
const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, appInitialState);

  const context = { ...state, dispatch };

  useEffect(() => {
    const existingProducts = JSON.parse(localStorage.getItem("newProducts"));
    console.log("existingProducts:context ", existingProducts);
    if (existingProducts) {
      dispatch({
        type: "UpdateProductList",
        payload: [...state.inventoryData, ...existingProducts],
      });
    }
  }, []);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
