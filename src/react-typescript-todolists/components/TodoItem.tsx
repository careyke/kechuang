/**
 * TodoItem
 */
import React, { useMemo, ReactElement } from 'react';
import classnames from 'classnames';
import styles from './TodoItem.less';
import Checkbox from './Checkbox'
import { TodoItem, IDispatchActionShape } from '../type'
interface ITodoItemPropsShape {
    todo: TodoItem;
    deleteTodo: IDispatchActionShape;
    toggleTodo: IDispatchActionShape
}

export default function TodoItem(props: ITodoItemPropsShape): ReactElement {
    let { todo, deleteTodo, toggleTodo } = props;
    let iconClass = classnames({
        [styles['deleteIcon']]: true,
        [styles['show_delete']]: true
    })
    let labelClass = classnames({
        [styles['label']]: true,
        [styles['completeLabel']]: todo.completed
    })
    const deleteClick = (): void => {
        deleteTodo(todo.id);
    }
    const toogleTodo = (selected: boolean): void => {
        let id = todo.id;
        toggleTodo(id, selected);
    }
    return (
        <div className={styles['todo']}>
            <div className={styles['todo_selectedIcon']}>
                {useMemo(() => <Checkbox selected={todo.completed} toogleTodo={toogleTodo} />, [todo.completed])}
            </div>
            <div className={styles['todo_label']}>
                <label className={labelClass}>{todo.text}</label>
                <span className={iconClass} onClick={deleteClick} ></span>
            </div>
        </div>
    )
}