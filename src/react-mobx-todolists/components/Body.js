/**
 * Body
 */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './Body.less';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Footer from './Footer';
import store from '../store';

@observer
class Body extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
}

export default Body;

@observer
class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    getList = () => {
        const { activeTodos, deleteTodo, toggleTodo } = store;
        return activeTodos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
        })
    }

    render() {
        return (
            <div className={styles['todolist']}>
                {this.getList()}
            </div>
        )
    }
}