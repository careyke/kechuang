/**
 * hooks-mobx todolists entry
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {useObserver} from 'mobx-react-lite'
import { Container } from './components';
import { StoreContext } from './customHooks';
import { TodoListStore } from './store';

export function exeReactHooksMobxTodolist() {
    let appDom = document.querySelector('#app');
    ReactDOM.render(
        <Provider></Provider>
        , appDom);
}

function Provider() {
    const store = new TodoListStore();
    window.store = store;
    return (
        <StoreContext.Provider value={store}>
            {useObserver(()=>(<Container />))}
        </StoreContext.Provider>
    )
}