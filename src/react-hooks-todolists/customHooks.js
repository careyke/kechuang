/**
 * 自定义hooks
 */
import { useState, useContext, useRef } from 'react';
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

export const useInputValue=()=>{

}