/**
 * 自定义hooks
 */
import React, { useState, useContext, useMemo, useCallback, useEffect, useRef } from 'react';
import * as actions from './actions';
import storeContext from './storeContext';

export const useGetListContext = () => {
    return useContext(storeContext);
}

export const useSwitchList = (activeKey) => {
    let [activeTab, switchTab] = useState(activeKey);
    let { state, dispatch } = useGetListContext();
    let boundActions = useBindActionCreator(dispatch);

    const getDisplayList = () => {
        let { todolist } = state;
        if (activeTab === 1) {
            return todolist.filter((todo) => {
                return todo.completed !== true
            });
        } else if (activeTab === 2) {
            return todolist.filter((todo) => {
                return todo.completed === true
            });
        } else {
            return todolist;
        }
    }
    return { activeTab, activeTodolist: getDisplayList(), todolist: state.todolist, boundActions, switchTab }
}

export const useBindActionCreator = (dispatch) => {
    let boundActions = {};
    Object.keys(actions).forEach((key) => {
        boundActions[key] = function (...args) {
            return dispatch(actions[key](...args))
        }
    })
    return boundActions;
}

export const useChangeValueByBindKeydown = (addTodo) => {
    let [value, setValue] = useState('');
    const handleChange = useCallback((e) => {
        let v = e.target.value;
        setValue(v);
    }, [])
    //react hook useCallback包装的函数会保存上一次的上下文执行环境，关键值不修改就不会销毁重建，
    //谨慎销毁重建 会导致react对比时多刷
    const handleKeyDown = useCallback((e) => {
        if (e.keyCode === 13) {
            addTodo(value);
            setValue('');
        }
    }, [value])

    return { value, handleKeyDown, handleChange }
}

export const useChangeValueByBindFocus = (inputRef, addTodo) => {
    let [value, setValue] = useState('');
    let focusStatus = useRef(false);
    const handleChange = useCallback((e) => {
        let v = e.target.value;
        setValue(v);
    }, [])
    const handleFocus = useCallback(() => {
        focusStatus.current = true;
        inputRef.current.addEventListener('keydown', keydownListener);
    }, [])
    const handleBlur = useCallback(() => {
        focusStatus.current = false;
        inputRef.current.removeEventListener('keydown', keydownListener);
    }, [])

    // 不知道为什么在keydownListener中取不到最新的value!!!!!!!
    // 答案：keydownListener只会在聚焦的时候才添加到监听，闭包存储的时候那个时间片段的执行上下文
    // ***因为这里每次value修改，这个函数都会重新执行一遍，每次都会创建新的执行上下文和变量，那么存在闭包中每一次也是不一样的！！！！
    const keydownListener = useCurrentClosure((e) => {
        if (e.keyCode === 13 && focusStatus.current) {
            addTodo(value);
            setValue('');
        }
    })

    return { value, handleChange, handleBlur, handleFocus }
}

/**
 * 每次刷新都使fn绑定最新的作用域闭包
 * 每次组件重现渲染的时候都会重新生成一个作用域，内部重新的定义的函数就可以在这个作用取值，没有重现定义的函数就会保存定义时的执行上下文
 * @param {*} fn 
 */
export const useCurrentClosure = (fn) => {
    const fnRef = useRef(fn); //设置的是初始值
    useEffect(() => {
        fnRef.current = fn  //每次重现绑定
    })
    const fnProxy = useCallback((...args) => fnRef.current(...args), [])
    return fnProxy;
}

//利用useEffect 和 useRef 可以实现didmount和didupdate
export const useDidUpdateBindClosure = (fn) => {
    const mountRef = useRef(false);
    const fnRef = useRef(fn);
    useEffect(() => {
        if (!mountRef.current) {
            mountRef.current = true;
        } else {
            fnRef.current = fn;
        }
    })
    const fnProxy = useCallback((...args) => fnRef.current(...args), []);
    return fnProxy;
}

export const useToggleCheckbox = (props) => {
    const [selected, setSelected] = useState(props.selected);
    if (selected !== props.selected) {
        console.log('yyyy')
        setSelected(props.selected);
    }
    const handleClick = useCallback(() => {
        if (props.isAll) {
            props.toggleAllTodos(!selected);
        } else {
            props.toogleTodo(!selected);
        }
        setSelected(!selected);
    }, [selected])
    return { selected, handleClick }
}

