/**
 * TodoItem
 */
import React from 'react';
import {observer} from 'mobx-react'
import classnames from 'classnames';
import styles from './TodoItem.less';
import Checkbox from './Checkbox'

@observer
export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteClick = () => {
        let { todo, deleteTodo } = this.props;
        deleteTodo(todo.id);
    }

    toogleTodo = (selected) => {
        let { todo, toggleTodo } = this.props;
        let id = todo.id;
        toggleTodo(id, selected);
    }

    shouldComponentUpdate(nextProps,nextState){
        // mobx中使用forceUpdate方法来刷新，会跳过shouldComponentUpdate的执行
        console.log('go in shouldUpdate',this.props.todo.id);
        if(nextProps.todo === this.props.todo){
            return false;
        }
        return true;
    }

    componentWillUnmount(){
        console.log('unmount item',this.props.todo.id);
    }

    componentDidMount(){
        console.log('didmount',this.props.todo.id)
    }

    render() {
        let { todo } = this.props;
        let completed = todo.completed;
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
                    <Checkbox selected={completed} toogleTodo={this.toogleTodo} />
                </div>
                <div className={styles['todo_label']}>
                    <label className={labelClass}>{todo.text}</label>
                    <span className={iconClass} onClick={this.deleteClick} ></span>
                </div>
            </div>
        )
    }
}
