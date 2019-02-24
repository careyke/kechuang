/**
 * TodoItem
 */
import React from 'react';
import classnames from 'classnames';
import styles from './TodoItem.less';
import Checkbox from './Checkbox'

export default function TodoItem(props) {
    let { todo, deleteTodo, toggleTodo } = props;
    let iconClass = classnames({
        [styles['deleteIcon']]: true,
        [styles['show_delete']]: true
    })
    let labelClass = classnames({
        [styles['label']]: true,
        [styles['completeLabel']]: todo.completed
    })
    const deleteClick = () => {
        deleteTodo(todo.id);
    }
    const toogleTodo = (selected) => {
        let id = todo.id;
        toggleTodo(id, selected);
    }
    return (
        <div className={styles['todo']}>
            <div className={styles['todo_selectedIcon']}>
                <Checkbox selected={todo.completed} toogleTodo={toogleTodo} />
            </div>
            <div className={styles['todo_label']}>
                <label className={labelClass}>{todo.text}</label>
                <span className={iconClass} onClick={deleteClick} ></span>
            </div>
        </div>
    )
}