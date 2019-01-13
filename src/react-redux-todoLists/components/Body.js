/**
 * Body
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Body.less';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Footer from './Footer';
import * as actions from '../actions';

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
        let { todolist } = this.props;
        let { activeKey } = this.state;
        if (activeKey === 1) {
            return todolist.filter((todo) => {
                return todo.get('completed') !== true
            });
        } else if (activeKey === 2) {
            return todolist.filter((todo) => {
                return todo.get('completed') === true
            });
        } else {
            return todolist;
        }
    }

    render() {
        let { addTodo, deleteTodo, todolist, toggleTodo, toggleAllTodos, clearCompleteTodos } = this.props;
        return (
            <div className={styles['body']}>
                <div className={styles['todoContainer']}>
                    <TodoInput addTodo={addTodo} toggleAllTodos={toggleAllTodos} todolist={todolist} />
                    <TodoList deleteTodo={deleteTodo} todolist={this.getDisplayList()} toggleTodo={toggleTodo} />
                </div>
                <Footer activeKey={this.state.activeKey} clearCompleteTodos={clearCompleteTodos} switchTab={this.switchTab} todolist={todolist} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todolist: state.todolist,
        completedNum: state.completedNum
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: bindActionCreators(addTodo, dispatch),
        deleteTodo: bindActionCreators(addTodo, dispatch)
    }
}
//mapDispatchToProps 这个参数是个Object和Function是不一样的，但是效果都是一样的，把dispatch在闭包存贮，不传下去
//Object无需自己包裹，而Function类型需要自己手动包裹dispacth
export const WrappedBody = connect(mapStateToProps, { ...actions })(Body);

class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    getList = () => {
        let { todolist, deleteTodo, toggleTodo } = this.props;
        return todolist.map((todo) => {
            return <TodoItem key={todo.get('id')} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
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