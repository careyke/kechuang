/**
 * checkbox
 */
import React, { Component } from 'react';
import classnames from 'classnames'
import styles from './Checkbox.less';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        let { isAll, toogleTodo, toggleAllTodos, selected } = this.props;
        if (isAll) {
            toggleAllTodos(!selected);
        } else {
            toogleTodo(!selected);
        }
    }

    render() {
        let iconClassName = classnames({
            [styles['icon']]: true,
            [styles['selectedIcon']]: this.props.selected,
            [styles['hide']]: this.props.show === false
        })
        return (
            <div className={styles['checkbox']}>
                <span className={iconClassName} onClick={this.handleClick} ></span>
            </div>
        )
    }
}