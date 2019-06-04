import { useContext, createContext, useReducer } from "react";
import { IStoreShape, IStateShape, IDispatchShape } from "./type";
import reducers from "./reducers";

export const StoreContext = createContext(<IStoreShape>{});

export const getStoreContext = (): IStoreShape => useContext(StoreContext);

export const useStore = (): [IStateShape, IDispatchShape] => {
  return useReducer(reducers, { index: 0, todolist: [] });
};
