/**
 * react-redux todolists entry
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { List } from 'immutable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Container } from './components';
import { todoListReducer } from './reducers'

export default function initRRTodoList() {
    let appDom = document.querySelector('#app');
    let store = createStore(todoListReducer, { index: 0, todolist: List() });
    window.store = store;
    ReactDOM.render(
        <Provider store={store} >
            <Container />
        </Provider>
        , appDom);
}