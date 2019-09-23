/**
 * Body
 */
import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Body.less';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { useStore } from '../customHooks';

export default function Body() {
    return (
        <div className={styles['body']}>
            <div className={styles['todoContainer']}>
                <TodoInput />
                <TodoList />
            </div>
            <Footer />
        </div>
    )
}

function TodoList() {
    const store = useStore();
    const getList = () => {
        return store.activeTodos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} id={todo.id} />
        })
    }
    return useObserver(() => (
        <div className={styles['todolist']}>
            {getList()}
        </div>
    ))
}
