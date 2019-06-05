/**
 * Body
 */
import React, { ReactElement, useState } from 'react';
import styles from './Body.less';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { useGetActiveTodolist, useGetBoundActions } from '../customHooks';
import { IDispatchActionShape, TodoItem as TodoItemType } from '../type'

interface ITodoListPropsShape {
    deleteTodo: IDispatchActionShape;
    toggleTodo: IDispatchActionShape;
    todolist: TodoItemType[];
}

export default function Body(props: {}): ReactElement {
    let [activeTab, switchTab] = useState(0)
    let { todolist, activeTodolist } = useGetActiveTodolist(activeTab);
    let { addTodo, toggleAllTodos, deleteTodo, toggleTodo, clearCompleteTodos } = useGetBoundActions();
    return (
        <div className={styles['body']}>
            <div className={styles['todoContainer']}>
                <TodoInput addTodo={addTodo} toggleAllTodos={toggleAllTodos} todolist={todolist} />
                <TodoList deleteTodo={deleteTodo} todolist={activeTodolist} toggleTodo={toggleTodo} />
            </div>
            <Footer activeKey={activeTab} clearCompleteTodos={clearCompleteTodos} switchTab={switchTab} todolist={todolist} />
        </div>
    )
}

function TodoList(props: ITodoListPropsShape): ReactElement {
    const getList = (): ReactElement[] => {
        let { todolist, deleteTodo, toggleTodo } = props;
        return todolist.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
        })
    }
    return (
        <div className={styles['todolist']}>
            {getList()}
        </div>
    )
}
