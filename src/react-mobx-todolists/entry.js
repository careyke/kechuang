/**
 * 入口
 */
import { Provider } from 'mobx-react';
import store from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from './components';

export default function initRMTodoList() {
    let appDom = document.querySelector('#app');
    window.store = store;
    ReactDOM.render(
        <Provider store={store} >
            <Container />
        </Provider>
        , appDom);
}