/**
 * TodoItem
 */
import React, { useMemo } from 'react';
import { useObserver } from 'mobx-react-lite';
import classnames from 'classnames';
import styles from './TodoItem.less';
import Checkbox from './Checkbox';
import { useStore } from '../customHooks';

export default function TodoItem(props) {
    const { deleteTodo, toggleTodo } = useStore();
    const { todo } = props;
    const iconClass = classnames({
        [styles['deleteIcon']]: true,
        [styles['show_delete']]: true
    })
    const labelClass = classnames({
        [styles['label']]: true,
        [styles['completeLabel']]: todo.completed
    })
    const deleteClick = () => {
        deleteTodo(todo.id);
    }
    return useObserver(() => (
        <div className={styles['todo']}>
            <div className={styles['todo_selectedIcon']}>
                {useMemo(() => <Checkbox selected={todo.completed} toogleTodo={toggleTodo} id={props.id} />, [todo.completed])}
            </div>
            <div className={styles['todo_label']}>
                <label className={labelClass}>{todo.text}</label>
                <span className={iconClass} onClick={deleteClick} ></span>
            </div>
        </div>
    ))
}