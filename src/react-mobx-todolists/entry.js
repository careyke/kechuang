/**
 * react-redux todolists entry
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from './components';
import store from './store';

export default function initRMTodoList() {
    window.store = store;
    let appDom = document.querySelector('#app');
    ReactDOM.render(
        <Container />
        , appDom);
}