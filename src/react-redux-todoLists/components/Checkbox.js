/**
 * checkbox
 */
import React, { Component } from 'react';
import classnames from 'classnames'
import styles from './Checkbox.less';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        }
    }

    handleClick = () => {
        let { isAll, toogleTodo, toggleAllTodos } = this.props;
        let selected = !this.state.selected;
        this.setState({
            selected: selected
        })
        if (isAll) {
            toggleAllTodos(selected);
        } else {
            toogleTodo(selected);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //专门用来修改state,由于是静态方法，拿不到this.props,原来在这个生命周期做的对比工作需要换其他方式来做
        let { selected } = nextProps;
        if (selected !== prevState.selected) {
            return { ...prevState, selected }
        }
        return null;
    }

    render() {
        let iconClassName = classnames({
            [styles['icon']]: true,
            [styles['selectedIcon']]: this.state.selected,
            [styles['hide']]: this.props.show === false
        })
        return (
            <div className={styles['checkbox']}>
                <span className={iconClassName} onClick={this.handleClick} ></span>
            </div>
        )
    }
}