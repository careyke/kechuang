import {
  useContext,
  createContext,
  useReducer,
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEventHandler,
  FocusEventHandler
} from "react";
import {
  IStoreShape,
  IStateShape,
  IDispatchShape,
  TodoItem,
  IBoundActionShape,
  IActionCreatorsShape,
  IDispatchActionShape
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
      return dispatch(
        (<IActionCreatorsShape>actions)[actionCreatorName](...args)
      );
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

export const useChangeValueByBindFocus = (
  inputRef: { current: any },
  addTodo: IDispatchActionShape
): {
  value: string;
  handleChange: ChangeEventHandler;
  handleBlur: FocusEventHandler;
  handleFocus: FocusEventHandler;
} => {
  let [value, setValue] = useState("");
  let focusStatus = useRef(false);
  const handleChange = useCallback(e => {
    let v = e.target.value;
    setValue(v);
  }, []);
  const handleFocus = useCallback(() => {
    focusStatus.current = true;
    inputRef.current.addEventListener("keydown", keydownListener);
  }, []);
  const handleBlur = useCallback(() => {
    focusStatus.current = false;
    inputRef.current.removeEventListener("keydown", keydownListener);
  }, []);

  // 不知道为什么在keydownListener中取不到最新的value!!!!!!!
  // 答案：keydownListener只会在聚焦的时候才添加到监听，闭包存储的时候那个时间片段的执行上下文
  // ***因为这里每次value修改，这个函数都会重新执行一遍，每次都会创建新的执行上下文和变量，那么存在闭包中每一次也是不一样的！！！！
  const keydownListener = useCurrentClosure(
    (e: KeyboardEvent): void => {
      if (e.keyCode === 13 && focusStatus.current) {
        addTodo(value);
        setValue("");
      }
    }
  );

  return { value, handleChange, handleBlur, handleFocus };
};

/**
 * 每次刷新都使fn绑定最新的作用域闭包
 * 每次组件重现渲染的时候都会重新生成一个作用域，内部重新的定义的函数就可以在这个作用取值，没有重现定义的函数就会保存定义时的执行上下文
 * @param {*} fn
 */
export const useCurrentClosure = (
  fn: (...args: any[]) => any
): ((...args: any[]) => any) => {
  const fnRef = useRef(fn); //设置的是初始值
  useEffect(() => {
    fnRef.current = fn; //每次重现绑定
  });
  const fnProxy = useCallback((...args) => fnRef.current(...args), []);
  return fnProxy;
};
