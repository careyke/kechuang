/**
 * Body
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './Body.less';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Footer from './Footer';

@inject('store')
@observer
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0
        }
    }

    switchTab = (key = 0) => {
        if (key !== this.state.activeKey) {
            this.setState({
                activeKey: key
            })
        }

    }

    getDisplayList = () => {
        let { todolist } = this.props.store;
        let { activeKey } = this.state;
        if (activeKey === 1) {
            return todolist.filter((todo) => {
                return todo.completed !== true
            });
        } else if (activeKey === 2) {
            return todolist.filter((todo) => {
                return todo.completed === true
            });
        } else {
            return todolist;
        }
    }

    static getDerivedStateFromProps(nextProps){
        console.log('nextProps',nextProps)
        return null;
    }

    render() {
        let {deleteTodo} = this.props.store;
        return (
            <div className={styles['body']}>
                <div className={styles['todoContainer']}>
                    <TodoInput />
                    <TodoList todolist={this.getDisplayList()} deleteTodo={deleteTodo} />
                </div>
                <Footer activeKey={this.state.activeKey} switchTab={this.switchTab} />
            </div>
        )
    }
}

export default Body;


class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    getList = () => {
        let { todolist, deleteTodo } = this.props;
        return todolist.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
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