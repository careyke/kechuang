/**
 * TodoItem
 */
import React from 'react';
import classnames from 'classnames';
import styles from './TodoItem.less';
import Checkbox from './Checkbox'
import {observer} from 'mobx-react'

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteClick = () => {
        let { todo, deleteTodo } = this.props;
        deleteTodo(todo.id);
    }

    toogleTodo = () => {
        let { todo } = this.props;
        todo.toggle();
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.todo === this.props.todo){
            return false;
        }
        return true;
    }

    render() {
        let { todo } = this.props;
        let text = todo.text;
        let completed = todo.completed === true ? true : false;
        let iconClass = classnames({
            [styles['deleteIcon']]: true,
            [styles['show_delete']]: true
        })
        let labelClass = classnames({
            [styles['label']]: true,
            [styles['completeLabel']]: completed
        })
        console.log('render todo:',todo.id)
        return (
            <div className={styles['todo']}>
                <div className={styles['todo_selectedIcon']}>
                    <Checkbox selected={todo.completed} toogleTodo={this.toogleTodo} />
                </div>
                <div className={styles['todo_label']}>
                    <label className={labelClass}>{text}</label>
                    <span className={iconClass} onClick={this.deleteClick} ></span>
                </div>
            </div>
        )
    }
}
