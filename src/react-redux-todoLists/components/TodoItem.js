/**
 * TodoItem
 */
import React from 'react';
import classnames from 'classnames';
import styles from './TodoItem.less';
import Checkbox from './Checkbox'

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteClick = () => {
        let { todo, deleteTodo } = this.props;
        deleteTodo(todo.get('id'));
    }

    toogleTodo = (selected) => {
        let { todo, toggleTodo } = this.props;
        let id = todo.get('id');
        toggleTodo(id, selected);
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('go in shouldUpdate',this.props.todo.get('id'));
        if(nextProps.todo === this.props.todo){
            return false;
        }
        return true;
    }

    componentWillUnmount(){
        console.log('unmount item',this.props.todo.get('id'));
    }

    componentDidMount(){
        console.log('didmount',this.props.todo.get('id'))
    }

    render() {
        let { todo } = this.props;
        let text = todo.get('text');
        let completed = todo.get('completed') === true ? true : false;
        let iconClass = classnames({
            [styles['deleteIcon']]: true,
            [styles['show_delete']]: true
        })
        let labelClass = classnames({
            [styles['label']]: true,
            [styles['completeLabel']]: completed
        })
        console.log('render todo:',todo.get('id'))
        return (
            <div className={styles['todo']}>
                <div className={styles['todo_selectedIcon']}>
                    <Checkbox selected={todo.get('completed')} toogleTodo={this.toogleTodo} />
                </div>
                <div className={styles['todo_label']}>
                    <label className={labelClass}>{text}</label>
                    <span className={iconClass} onClick={this.deleteClick} ></span>
                </div>
            </div>
        )
    }
}
