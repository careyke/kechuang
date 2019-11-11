import React from 'react';
import ReactDOM from 'react-dom';
import {EventTest} from './ReactEventTest';
import {ReactState} from './ReactState';
import {ReactStateTest,ReactClassStateTest} from './ReactStateTest'

export default function exeReactTest() {
    let appDom = document.querySelector('#app');
    ReactDOM.render(
        <ReactStateTest></ReactStateTest>
        , appDom);
}
