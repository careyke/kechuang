/**
 * hooks todolists entry
 */
import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import StoreContext from './storeContext';
import reducers from './reducer';
import { Container } from './components'

export default function exeReactHooksTodolist() {
    let appDom = document.querySelector('#app');
    ReactDOM.render(
        <Provider></Provider>
        , appDom);
}

function Provider(props) {
    let initState = useContext(StoreContext);
    let [state, dispatch] = useReducer(reducers, initState); //useReduce内部使用useState实现
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <Container />
        </StoreContext.Provider>
    )
}