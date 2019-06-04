/**
 * Body
 */
import React, { useMemo } from 'react';
import styles from './Body.less';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { useSwitchList } from '../customHooks';

export default function Body(props) {
    let { activeTab, boundActions, switchTab, todolist, activeTodolist } = useSwitchList(0);
    let { addTodo, toggleAllTodos, deleteTodo, toggleTodo, clearCompleteTodos } = boundActions;
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

function TodoList(props) {
    const getList = () => {
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
