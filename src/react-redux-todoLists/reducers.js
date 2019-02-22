/**
 * reucers
 */
import { combineReducers } from 'redux';
import { Map } from 'immutable';

export const todoListReducer = (state = {}, action) => {
    switch (action.type) {
        case 'addTodo':
            return addTodo(state, action);
        case 'deleteTodo':
            return deleteTodo(state, action);
        case 'toggleTodo':
            return toggleTodo(state, action);
        case 'toggleAllTodos':
            return toggleAllTodos(state, action);
        case 'clearCompleteTodos':
            return clearCompleteTodos(state, action);
        case 'sort':
            return sort(state, action);
        case 'modifyId':
            return modifyId(state, action);
    }
    return state;
}

const addTodo = (state, action) => {
    let { text } = action;
    let { index, todolist } = state;
    todolist = todolist.push(Map({ id: index++, text: text }));
    return { ...state, index, todolist }
}

const deleteTodo = (state, action) => {
    let { todolist } = state;
    todolist = todolist.filter((item) => {
        return item.get('id') !== action.id
    })
    return { ...state, todolist };
}

const toggleTodo = (state, action) => {
    let { id, completed } = action;
    let { todolist } = state;
    todolist = todolist.map((todo) => {
        if (todo.get('id') === id) {
            return todo.set('completed', completed);
        }
        return todo;
    })
    return { ...state, todolist };
}

const toggleAllTodos = (state, action) => {
    let { todolist } = state;
    let { completed } = action;
    todolist = todolist.map((todo) => {
        return todo.set('completed', completed);
    })
    return { ...state, todolist }
}

const clearCompleteTodos = (state, action) => {
    let { todolist } = state;
    todolist = todolist.filter((todo) => {
        return todo.get('completed') !== true
    })
    return { ...state, todolist }
}

const sort = (state, action) => {
    let { todolist } = state;
    todolist = todolist.sortBy((todo) => todo.get('id'), (a, b) => b - a);
    return { ...state, todolist }
}

const modifyId = (state, action) => {
    let { oid, nid } = action;
    let { todolist } = state;
    todolist = todolist.map((todo) => {
        if (todo.get('id') === oid){
            return todo.set('id',nid)
        }
        return todo
    })
    return { ...state, todolist }
}