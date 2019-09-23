/**
 * todoinput
 */
import React, { useMemo, useRef } from 'react';
import { useObserver, useComputed } from 'mobx-react-lite';
import styles from './TodoInput.less';
import Checkbox from './Checkbox';
import { useStore, useChangeValueByBindFocus } from '../customHooks'

export default function TodoInput() {
    const { toggleAllTodos, addTodo, unfinishTodoNum, todos } = useStore();
    const showCheckBox = useComputed(() => {
        return todos.length > 0;
    }, [todos]);
    const selectedAll = useComputed(() => {
        return todos.length > 0 && unfinishTodoNum === 0;
    }, [todos, unfinishTodoNum])

    return useObserver(() => {
        return <div className={styles['todoInput']}>
            <div className={styles['todoInput_checkbox']}>
                {useMemo(() => <Checkbox isAll={true} show={showCheckBox} selected={selectedAll} toggleAllTodos={toggleAllTodos} />, [selectedAll, showCheckBox])}
            </div>
            <div className={styles['todoInput_input']}>
                <Input addTodo={addTodo} />
            </div>
        </div>
    })

}

function Input(props) {
    const inputRef = useRef(null);
    const { value, handleBlur, handleFocus, handleChange } = useChangeValueByBindFocus(inputRef, props.addTodo)
    return <input
        ref={inputRef}
        className={styles['input']}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={'What needs to be done?'}
    />
}
