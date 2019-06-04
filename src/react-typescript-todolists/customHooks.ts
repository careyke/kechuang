import { useContext, createContext, useReducer } from "react";
import {
  IStoreShape,
  IStateShape,
  IDispatchShape,
  TodoItem,
  IBoundActionShape,
  IActionCreatorsShape
} from "./type";
import reducers from "./reducers";
import * as actions from "./actions";

export const StoreContext = createContext(<IStoreShape>{});

export const getStoreContext = (): IStoreShape => useContext(StoreContext);

export const useStore = (): [IStateShape, IDispatchShape] => {
  return useReducer(reducers, { index: 0, todolist: [] });
};

export const useGetBoundActions = (): IBoundActionShape => {
  const boundActions: IBoundActionShape = {};
  const { dispatch } = getStoreContext();
  Object.keys(actions).forEach(actionCreatorName => {
    boundActions[actionCreatorName] = function(...args: any[]): void {
      return dispatch((<IActionCreatorsShape>actions)[actionCreatorName](...args));
    };
  });
  return boundActions;
};

export const useGetActiveTodolist = (
  activeTab: number
): { todolist: TodoItem[]; activeTodolist: TodoItem[] } => {
  const { state } = getStoreContext();
  const getDisplayList = (): TodoItem[] => {
    let { todolist } = state;
    if (activeTab === 1) {
      return todolist.filter(todo => {
        return todo.completed !== true;
      });
    } else if (activeTab === 2) {
      return todolist.filter(todo => {
        return todo.completed === true;
      });
    } else {
      return todolist;
    }
  };
  return { todolist: state.todolist, activeTodolist: getDisplayList() };
};
