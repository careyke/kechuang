/**
 * todoinput
 */
import React, { Component } from 'react';
import { observer } from 'mobx-react'
import styles from './TodoInput.less';
import Checkbox from './Checkbox';
import store from '../store';

@observer
export default class TodoInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { addTodo, selectedAll, showSelectedAll, toggleAllTodos } = store;
        return (
            <div className={styles['todoInput']}>
                <div className={styles['todoInput_checkbox']}>
                    <Checkbox isAll={true} show={showSelectedAll} selected={selectedAll} toggleAllTodos={toggleAllTodos} />
                </div>
                <div className={styles['todoInput_input']}>
                    <Input addTodo={addTodo} />
                </div>
            </div>
        )
    }
}

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.focus = false;
    }

    handleChange = (e) => {
        let v = e.target.value;
        this.setState({
            value: v
        })
    }

    keydownListener = (e) => {
        let { addTodo } = this.props;
        if (e.keyCode === 13 && this.focus) {
            addTodo(this.state.value);
            this.setState({
                value: ''
            })
        }
    }

    handleFocus = () => {
        this.focus = true;
        this.input.addEventListener('keydown', this.keydownListener);
    }

    handleBlur = () => {
        this.focus = true;
        this.input.removeEventListener('keydown', this.keydownListener);
    }

    render() {
        return (
            <input
                ref={dom => this.input = dom}
                className={styles['input']}
                value={this.state.value}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                placeholder={'What needs to be done?'}
            />
        )
    }
}