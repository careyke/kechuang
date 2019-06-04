/**
 * typescript example
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StoreContext, useStore } from './customHooks'

const exeReactHooksTodolist = (): void => {
  const appDom = document.querySelector('#app');
  ReactDOM.render(<Provider />, appDom);
}

function Provider(): React.ReactElement {
  const [state, dispatch] = useStore();
  return (
    <StoreContext.Provider value={{ state, dispatch }}>

    </StoreContext.Provider>
  )
}

export default exeReactHooksTodolist;