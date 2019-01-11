/**
 * react-redux todolists entry
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from './components'

export default function initRRTodoList() {
    let appDom = document.querySelector('#app');
    ReactDOM.render(<Container />, appDom);
}