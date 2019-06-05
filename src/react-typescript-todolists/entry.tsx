/**
 * typescript example
 */
import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { StoreContext, useStore } from './customHooks';
import Container from './components/Container';

const exeReactTypescriptTodolist = (): void => {
  const appDom = document.querySelector('#app');
  ReactDOM.render(<Provider />, appDom);
}

function Provider(): ReactElement {
  const [state, dispatch] = useStore();
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Container />
    </StoreContext.Provider>
  )
}

export default exeReactTypescriptTodolist;