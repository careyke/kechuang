/**
 * action creators
 */

export function addTodo(text) {
    return {
        type: 'addTodo',
        text: text
    }
}

export function deleteTodo(id) {
    return {
        type: 'deleteTodo',
        id: id
    }
}

export function toggleTodo(id, selected) {
    return {
        type: 'toggleTodo',
        id: id,
        completed: selected
    }
}

export function toggleAllTodos(selected) {
    return {
        type: 'toggleAllTodos',
        completed: selected
    }
}

export function clearCompleteTodos(){
    return {
        type: 'clearCompleteTodos'
    }
}