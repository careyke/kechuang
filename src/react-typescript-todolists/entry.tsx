/**
 * typescript example
 */
import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { StoreContext, useStore } from './customHooks'

const exeReactHooksTodolist = (): void => {
  const appDom = document.querySelector('#app');
  ReactDOM.render(<Provider />, appDom);
}

function Provider(): ReactElement {
  const [state, dispatch] = useStore();
  return (
    <StoreContext.Provider value={{ state, dispatch }}>

    </StoreContext.Provider>
  )
}

export default exeReactHooksTodolist;