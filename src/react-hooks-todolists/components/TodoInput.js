/**
 * todoinput
 */
import React, { useMemo, useRef } from 'react';
import styles from './TodoInput.less';
import Checkbox from './Checkbox';
import { useChangeValueByBindKeydown, useChangeValueByBindFocus } from '../customHooks'

export default function TodoInput(props) {
    let { addTodo, todolist, toggleAllTodos } = props;
    const getAllSelected = () => {
        let noAllCompleted = todolist.some((todo) => {
            return todo.completed !== true;
        })
        return !noAllCompleted && todolist.length > 0
    }
    const selected = getAllSelected();
    const show = todolist.length > 0;
    return (
        <div className={styles['todoInput']}>
            <div className={styles['todoInput_checkbox']}>
                {useMemo(() => <Checkbox isAll={true} show={show} selected={selected} toggleAllTodos={toggleAllTodos} />, [selected, show])}
            </div>
            <div className={styles['todoInput_input']}>
                <Input addTodo={addTodo} />
            </div>
        </div>
    )
}

function Input(props) {
    let inputRef = useRef(null);
    let { value, handleBlur, handleFocus, handleChange } = useChangeValueByBindFocus(inputRef, props.addTodo)
    // let { value, handleChange, handleKeyDown } = useChangeValueByBindKeydown(props.addTodo);

    return (
        <input
            ref={inputRef}
            className={styles['input']}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // onKeyDown={handleKeyDown}
            onChange={handleChange}
            placeholder={'What needs to be done?'}
        />
    )
}
