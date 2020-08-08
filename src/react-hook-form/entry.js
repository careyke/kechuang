/**
 * reac hook form entry
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form'

export default function exeReactHookForm() {
    let appDom = document.querySelector('#app');
    ReactDOM.render(
        <Form></Form>
        , appDom);
}
