/**
 * store context
 */
import { createContext } from 'react';

const store = {
    index: 0,
    todolist: []
}

export default createContext(store);