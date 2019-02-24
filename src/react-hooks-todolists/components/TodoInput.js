/**
 * todoinput
 */
import React, { useRef, useState } from 'react';
import styles from './TodoInput.less';
import Checkbox from './Checkbox';

export default function TodoInput(props) {
    let { addTodo, todolist, toggleAllTodos } = props;
    const getAllSelected = () => {
        let noAllCompleted = todolist.some((todo) => {
            return todo.completed !== true;
        })
        return !noAllCompleted && todolist.lenght > 0
    }
    return (
        <div className={styles['todoInput']}>
            <div className={styles['todoInput_checkbox']}>
                <Checkbox isAll={true} show={todolist.length > 0} selected={getAllSelected()} toggleAllTodos={toggleAllTodos} />
            </div>
            <div className={styles['todoInput_input']}>
                <Input addTodo={addTodo} />
            </div>
        </div>
    )
}

function Input(props) {
    let [value, setValue] = useState('');
    let inputRef = useRef({ focus: false });
    console.log('value:',value);
    const handleChange = (e) => {
        let v = e.target.value;
        setValue(v);
    }
    const keydownListener = (e) => {
        if (e.keyCode === 13 && inputRef.current.focus) {
            console.log('newvalue:',value);
            props.addTodo(value);
            setValue('');
        }
    }

    const handleFocus = () => {
        inputRef.current.focus = true;
        inputRef.current.addEventListener('keydown', keydownListener);
    }

    const handleBlur = () => {
        inputRef.current.focus = true;
        inputRef.current.removeEventListener('keydown', keydownListener);
    }

    return (
        <input
            ref={inputRef}
            className={styles['input']}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={'What needs to be done?'}
        />
    )
}
